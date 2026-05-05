"use client";

import { useEffect, useRef } from "react";

/**
 * Fullscreen "melted chocolate" background — static pool that ripples
 * fluidly around the cursor.
 *
 * Idle state: perfectly still. No ambient animation generators.
 *
 * When the cursor moves, it presses the surface down with a soft radial
 * Gaussian impression proportional to speed. Those impressions then
 * propagate outward as circular ripples via the discrete 2D wave equation:
 *
 *     h(t+1) = 2·h(t) - h(t-1) + c² · (neighbors - 4·h)    * damping
 *
 * Ripples reflect, interfere, and dampen back to flat — so the surface
 * returns to static after the cursor stops.
 */

const GRID_W = 384;
const GRID_H = 240;

export default function MeltedChocolateBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      premultipliedAlpha: false,
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    // ---------- shaders ----------
    const vertSrc = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_height;
      uniform vec2 u_texSize;
      uniform vec2 u_resolution;

      const float NORMAL_STRENGTH = 8.0;
      const float SHININESS = 110.0;

      // Page color (muted light blue) is the base; ripples read as gentle
      // pale-blue highlights and slightly cooler shadows on a still pool.
      const vec3 AMB = vec3(221.0, 230.0, 238.0) / 255.0;  /* same as --background */
      const vec3 DIF = vec3(197.0, 211.0, 223.0) / 255.0;  /* paper-deep */
      const vec3 SPC = vec3(244.0, 249.0, 253.0) / 255.0;  /* paper */

      // Height is stored in [0,1], centered at 0.5 (0 = baseline).
      float sampleHeight(vec2 uv) {
        return texture2D(u_height, uv).r - 0.5;
      }

      void main() {
        vec2 texel = 1.0 / u_texSize;

        float h  = sampleHeight(v_uv);
        float hL = sampleHeight(v_uv - vec2(texel.x, 0.0));
        float hR = sampleHeight(v_uv + vec2(texel.x, 0.0));
        float hU = sampleHeight(v_uv - vec2(0.0, texel.y));
        float hD = sampleHeight(v_uv + vec2(0.0, texel.y));

        vec2 grad = vec2(hR - hL, hD - hU) * NORMAL_STRENGTH;
        vec3 N = normalize(vec3(-grad, 1.0));

        vec3 L = normalize(vec3(0.55, -0.55, 0.72));
        vec3 V = vec3(0.0, 0.0, 1.0);
        vec3 H = normalize(L + V);

        float diff = max(dot(N, L), 0.0);
        float spec = pow(max(dot(N, H), 0.0), SHININESS) * 0.35;
        float fres = pow(1.0 - max(N.z, 0.0), 2.0) * 0.15;

        // Very slight depth modulation — tiny warm shift with height
        float depth = 0.95 + h * 0.12;

        vec3 color = AMB * depth + (DIF - AMB) * diff * 0.55 + SPC * (spec + fres);

        // Whisper-soft vignette — keep the page open, corners barely warmer
        vec2 fromCenter = (v_uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
        float vig = smoothstep(0.95, 0.4, length(fromCenter));
        color *= mix(0.92, 1.0, vig);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(s);
        gl.deleteShader(s);
        throw new Error("Shader compile failed: " + log);
      }
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Program link failed: " + gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const locPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

    const locTex = gl.getUniformLocation(program, "u_height");
    const locTexSize = gl.getUniformLocation(program, "u_texSize");
    const locRes = gl.getUniformLocation(program, "u_resolution");

    const tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(locTex, 0);
    // Flip Y on upload so texture row 0 (our grid's top) maps to the top of the
    // screen. Without this, WebGL's bottom-origin UVs mirror the effect vertically.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    // ---------- wave simulation (CPU) ----------
    const size = GRID_W * GRID_H;
    // Three buffers for the discrete wave equation: t-1, t, t+1.
    // Rotated by reference each frame (no allocations in the loop).
    let hPrev = new Float32Array(size);
    let h = new Float32Array(size);
    let hNext = new Float32Array(size);
    const heightBytes = new Uint8Array(size);

    const idx = (x: number, y: number) => x + y * GRID_W;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Mouse tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let mouseInside = false;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!mouseInside) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        mouseInside = true;
      }
    };
    const handleLeave = () => {
      mouseInside = false;
    };

    // Smoothed motion direction so the blade doesn't jitter on small wobbles
    let dirX = 1;
    let dirY = 0;

    // Blade cut — a thin elongated depression aligned with the motion
    // direction, as if a knife is slicing through the fluid below the
    // surface. The blade is long along the direction of travel and very
    // narrow perpendicular to it, so the wave equation throws ripples out
    // to both sides (the material "parts") instead of radiating concentric
    // circles like a fingertip press would.
    const BLADE_HALF_LEN = 7.0; // grid cells along motion
    const BLADE_HALF_WID = 1.25; // grid cells perpendicular — keep sharp
    const BLADE_SEARCH = Math.ceil(BLADE_HALF_LEN) + 1;

    const applyMousePress = () => {
      if (!mouseInside) return;
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed < 0.5) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        return;
      }

      // Smooth the blade orientation (exponential moving average on the
      // unit direction vector) — prevents the slit from flipping wildly
      // when the cursor jiggles.
      const nx = dx / speed;
      const ny = dy / speed;
      const blend = 0.4;
      dirX = dirX * (1 - blend) + nx * blend;
      dirY = dirY * (1 - blend) + ny * blend;
      const dl = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
      const ax = dirX / dl; // blade long axis (unit)
      const ay = dirY / dl;
      const ppx = -ay; // perpendicular (blade width axis)
      const ppy = ax;

      // Cut depth — sharper than a press, scales with speed
      const baseStrength = Math.min(0.08 + speed * 0.012, 0.42);

      // Sub-steps so fast swipes still produce a continuous slice
      const steps = Math.max(1, Math.ceil(speed / 3));
      const perStep = baseStrength / (steps + 1);

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = lastMouseX + dx * t;
        const py = lastMouseY + dy * t;
        const gx = (px / width) * GRID_W;
        const gy = (py / height) * GRID_H;
        const cx = Math.floor(gx);
        const cy = Math.floor(gy);
        const fx = gx - cx;
        const fy = gy - cy;

        for (let j = -BLADE_SEARCH; j <= BLADE_SEARCH; j++) {
          for (let i = -BLADE_SEARCH; i <= BLADE_SEARCH; i++) {
            const x = cx + i;
            const y = cy + j;
            if (x < 2 || y < 2 || x >= GRID_W - 2 || y >= GRID_H - 2) continue;
            const di = i - fx;
            const dj = j - fy;
            // Project onto blade local axes
            const along = di * ax + dj * ay;
            const perp = di * ppx + dj * ppy;
            // Normalized distance in the blade ellipse
            const na = along / BLADE_HALF_LEN;
            const np = perp / BLADE_HALF_WID;
            const r2 = na * na + np * np;
            if (r2 > 1.2) continue;
            // Sharp Gaussian — falls off fast perpendicular to the blade
            const falloff = Math.exp(-r2 * 2.2);
            h[idx(x, y)] -= perStep * falloff;
          }
        }
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    // Proper 2D wave equation:
    //   h_next = 2·h − h_prev + c² · ( h_L + h_R + h_U + h_D − 4·h )
    // Damping < 1 makes ripples decay so the pool returns to perfectly
    // static after the cursor stops. c² is kept safely below 0.5 for
    // numerical stability.
    const C2 = 0.28; // wave speed squared (keep < 0.5 for stability)
    const DAMPING = 0.9955; // close to 1 = wake lingers so the cut reads clearly
    const FLAT_EPS = 1e-4; // below this, snap to zero so it truly stops

    const updateSurface = () => {
      for (let y = 1; y < GRID_H - 1; y++) {
        const row = y * GRID_W;
        for (let x = 1; x < GRID_W - 1; x++) {
          const i = row + x;
          const lap =
            h[i - 1] + h[i + 1] + h[i - GRID_W] + h[i + GRID_W] - 4 * h[i];
          let v = (2 * h[i] - hPrev[i] + C2 * lap) * DAMPING;
          if (v > -FLAT_EPS && v < FLAT_EPS) v = 0;
          hNext[i] = v;
        }
      }
      // Rotate buffers: hPrev ← h, h ← hNext, hNext ← (old hPrev, to be overwritten)
      const tmp = hPrev;
      hPrev = h;
      h = hNext;
      hNext = tmp;
    };

    const uploadHeight = () => {
      // Map [-1, 1] → [0, 255], centered on 128
      for (let i = 0; i < size; i++) {
        let v = h[i] * 90 + 128;
        if (v < 0) v = 0;
        if (v > 255) v = 255;
        heightBytes[i] = v;
      }
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE,
        GRID_W,
        GRID_H,
        0,
        gl.LUMINANCE,
        gl.UNSIGNED_BYTE,
        heightBytes
      );
    };

    let rafId = 0;
    const loop = () => {
      applyMousePress();
      updateSurface();
      uploadHeight();

      gl.uniform2f(locTexSize, GRID_W, GRID_H);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      gl.deleteProgram(program);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className="melted-choc-canvas" aria-hidden="true" />;
}
