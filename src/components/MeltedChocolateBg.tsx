"use client";

import { useEffect, useRef } from "react";

/**
 * Fullscreen "melted chocolate" background — water-like waves.
 *
 * The surface is a 2D wave equation solved on a coarse grid:
 *
 *     h(t+1) = 2·h(t) - h(t-1) + c² · (neighbors - 4·h)   * damping
 *
 * The cursor continuously presses the surface down — like a finger dragging
 * through water — so as it moves it leaves a V-shaped wake and ripples
 * expand outward from each press. Waves reflect and interfere naturally.
 *
 * A WebGL fragment shader treats the height field as a surface, computes
 * normals from its gradient, and shades it with Blinn-Phong lighting for
 * a glossy 3D liquid look.
 */

const GRID_W = 256;
const GRID_H = 160;

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

      const float NORMAL_STRENGTH = 18.0;
      const float SHININESS = 90.0;

      const vec3 AMB = vec3(14.0, 8.0, 5.0) / 255.0;
      const vec3 DIF = vec3(140.0, 82.0, 40.0) / 255.0;
      const vec3 SPC = vec3(255.0, 232.0, 188.0) / 255.0;

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
        float spec = pow(max(dot(N, H), 0.0), SHININESS);
        float fres = pow(1.0 - max(N.z, 0.0), 2.0) * 0.4;

        // Very slight depth modulation from surface height so crests feel warmer
        float depth = 0.85 + h * 0.25;

        vec3 color = AMB + DIF * diff * depth + SPC * (spec + fres * 0.3);

        // Soft vignette so corners settle into darkness
        vec2 fromCenter = (v_uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
        float vig = smoothstep(0.9, 0.32, length(fromCenter));
        color *= mix(0.5, 1.0, vig);

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
    // Height fields at time t and t-1 for the discrete wave equation
    let h = new Float32Array(size);
    let hPrev = new Float32Array(size);
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

    // Smoothed motion direction — keeps the arrow stable while moving
    let dirX = 0;
    let dirY = 0;

    // The cursor paints an ARROW / TEARDROP shape on the surface: the tip
    // sits at the cursor and the body trails behind along the direction of
    // motion. No radial splash — just a clean directional shape that
    // follows the mouse. Wave propagation is very slow so it doesn't
    // spread out in circles.
    const applyMousePress = () => {
      if (!mouseInside) return;
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed < 0.3) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        return;
      }

      // Smooth direction (exponential moving average) so the arrow doesn't
      // wobble when the mouse jitters
      const nx = dx / speed;
      const ny = dy / speed;
      const dirBlend = 0.35;
      dirX = dirX * (1 - dirBlend) + nx * dirBlend;
      dirY = dirY * (1 - dirBlend) + ny * dirBlend;
      const dl = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
      const ax = dirX / dl; // arrow direction (unit)
      const ay = dirY / dl;
      const px = -ay; // perpendicular
      const py = ax;

      // Arrow geometry in grid units
      const LENGTH = 10; // how far behind the tip the tail extends
      const MAX_WIDTH = 2.2; // widest point across
      const strength = Math.min(0.25 + speed * 0.025, 0.85);

      // Interpolate along the cursor's last step so fast moves still paint a
      // continuous arrow without gaps. For each sub-step we stamp the whole
      // arrow shape with a fractional strength.
      const steps = Math.max(1, Math.ceil(speed / 6));

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const tipPx = lastMouseX + dx * t;
        const tipPy = lastMouseY + dy * t;
        const gx = (tipPx / width) * GRID_W;
        const gy = (tipPy / height) * GRID_H;
        const cx = Math.floor(gx);
        const cy = Math.floor(gy);
        const fx = gx - cx;
        const fy = gy - cy;

        // Bounding box of the arrow stamp in cells
        const searchR = Math.ceil(LENGTH) + 1;
        for (let j = -searchR; j <= searchR; j++) {
          for (let i = -searchR; i <= searchR; i++) {
            const x = cx + i;
            const y = cy + j;
            if (x < 2 || y < 2 || x >= GRID_W - 2 || y >= GRID_H - 2) continue;
            const di = i - fx;
            const dj = j - fy;
            // Offset projected onto arrow (along, perp) axes.
            // Convention: along > 0 is BEHIND the tip (along the arrow
            // body), so along = -(di·ax + dj·ay).
            const along = -(di * ax + dj * ay);
            const perp = di * px + dj * py;

            // Skip anything ahead of the tip (sharp point) or past the tail
            if (along < -0.2 || along > LENGTH) continue;

            // Teardrop profile: sin(π · u) where u = along/LENGTH ∈ [0,1].
            // Zero at the tip (sharp point), peaks around the middle, zero
            // at the tail (smooth taper).
            const u = along / LENGTH;
            const widthFactor = Math.sin(Math.PI * u);
            if (widthFactor <= 0.01) continue;

            const localWidth = MAX_WIDTH * widthFactor;
            const pn = perp / localWidth;
            if (pn <= -1 || pn >= 1) continue;

            // Parabolic cross-section (round edges)
            const crossFall = 1 - pn * pn;
            const fall = crossFall * widthFactor;
            h[idx(x, y)] -= (strength * fall) / (steps + 1);
          }
        }
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    // Discrete 2D wave equation step.
    // h_next = 2·h - h_prev + c² · Laplacian(h), then damp.
    const waveStep = () => {
      const c2 = 0.06; // wave-speed² — small so the arrow doesn't spread into circles
      const damp = 0.93; // global damping — low so the arrow fades quickly when mouse stops
      for (let y = 1; y < GRID_H - 1; y++) {
        const row = y * GRID_W;
        for (let x = 1; x < GRID_W - 1; x++) {
          const i = row + x;
          const lap =
            h[i - 1] + h[i + 1] + h[i - GRID_W] + h[i + GRID_W] - 4 * h[i];
          const next = (2 * h[i] - hPrev[i] + c2 * lap) * damp;
          hPrev[i] = next;
        }
      }
      // Swap — hPrev now holds the new step
      const tmp = h;
      h = hPrev;
      hPrev = tmp;
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
      waveStep();
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
