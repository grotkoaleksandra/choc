"use client";

import { useEffect, useRef } from "react";

/**
 * Fullscreen "melted chocolate" fluid background.
 *
 * - CPU runs a low-resolution semi-Lagrangian fluid simulation (velocity +
 *   dye density fields) so the surface has momentum, swirls, and trails.
 * - Each frame the density field is uploaded as a GPU texture.
 * - A WebGL fragment shader samples that texture bilinearly and computes
 *   Blinn-Phong lighting per screen pixel — surface normals come from the
 *   density gradient, a directional light produces diffuse shading and a
 *   glossy specular highlight.
 *
 * Result: the simulation is cheap, but the rendered surface is smooth and
 * flawless at full resolution with GPU-filtered shading. No visible pixel
 * grid, no upscale blur artifacts.
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

    // ---------- shader setup ----------
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
      uniform sampler2D u_density;
      uniform vec2 u_texSize;
      uniform vec2 u_resolution;
      uniform float u_time;

      // Lighting params
      const float NORMAL_STRENGTH = 14.0;
      const float SHININESS = 80.0;

      const vec3 AMB  = vec3(14.0, 8.0, 5.0) / 255.0;
      const vec3 DIF  = vec3(140.0, 82.0, 40.0) / 255.0;
      const vec3 SPC  = vec3(255.0, 230.0, 188.0) / 255.0;

      // Smooth density sample — bilinear is free on the GPU
      float sampleDensity(vec2 uv) {
        return texture2D(u_density, uv).r;
      }

      void main() {
        vec2 texel = 1.0 / u_texSize;

        float h  = sampleDensity(v_uv);
        float hL = sampleDensity(v_uv - vec2(texel.x, 0.0));
        float hR = sampleDensity(v_uv + vec2(texel.x, 0.0));
        float hU = sampleDensity(v_uv - vec2(0.0, texel.y));
        float hD = sampleDensity(v_uv + vec2(0.0, texel.y));

        // 4-tap gradient from neighbors
        vec2 grad = vec2(hR - hL, hD - hU) * NORMAL_STRENGTH;
        vec3 N = normalize(vec3(-grad, 1.0));

        // Directional light from upper-left, slightly forward
        vec3 L = normalize(vec3(0.55, -0.55, 0.72));
        vec3 V = vec3(0.0, 0.0, 1.0);
        vec3 H = normalize(L + V);

        float diff = max(dot(N, L), 0.0);
        float spec = pow(max(dot(N, H), 0.0), SHININESS);

        // A subtle rim/fresnel that brightens the thin edges of swells
        float fres = pow(1.0 - max(N.z, 0.0), 2.0) * 0.35;

        // Depth modulation — denser regions are richer, shallow ones darker
        float depth = 0.55 + clamp(h, 0.0, 1.5) * 0.45;

        vec3 color = AMB + DIF * diff * depth + SPC * (spec + fres * 0.35);

        // Soft vignette into darkness toward the edges
        vec2 fromCenter = (v_uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
        float vig = smoothstep(0.9, 0.35, length(fromCenter));
        color *= mix(0.45, 1.0, vig);

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

    // Fullscreen quad
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const locPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

    const locTex = gl.getUniformLocation(program, "u_density");
    const locTexSize = gl.getUniformLocation(program, "u_texSize");
    const locRes = gl.getUniformLocation(program, "u_resolution");
    const locTime = gl.getUniformLocation(program, "u_time");

    // Density texture (single-channel luminance works well for this)
    const tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(locTex, 0);

    // Byte buffer we upload to the density texture each frame
    const densityBytes = new Uint8Array(GRID_W * GRID_H);

    // ---------- simulation (CPU) ----------
    const size = GRID_W * GRID_H;
    let density = new Float32Array(size);
    let densityPrev = new Float32Array(size);
    let velX = new Float32Array(size);
    let velXPrev = new Float32Array(size);
    let velY = new Float32Array(size);
    let velYPrev = new Float32Array(size);

    const idx = (x: number, y: number) => x + y * GRID_W;

    // Seed a gentle swirl + baseline liquid so there's always surface to shade
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const i = idx(x, y);
        const nx = x / GRID_W - 0.5;
        const ny = y / GRID_H - 0.5;
        velX[i] = -ny * 0.35;
        velY[i] = nx * 0.35;
        density[i] =
          0.42 +
          Math.sin(x * 0.07 + y * 0.11) * 0.08 +
          Math.cos(x * 0.14 - y * 0.09) * 0.06;
      }
    }

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

    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let hasMoved = false;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        hasMoved = true;
      }
    };

    const advect = (
      out: Float32Array,
      src: Float32Array,
      vx: Float32Array,
      vy: Float32Array,
      dt: number
    ) => {
      for (let y = 0; y < GRID_H; y++) {
        for (let x = 0; x < GRID_W; x++) {
          const i = idx(x, y);
          let px = x - vx[i] * dt;
          let py = y - vy[i] * dt;
          if (px < 0) px = 0;
          if (py < 0) py = 0;
          if (px > GRID_W - 1.001) px = GRID_W - 1.001;
          if (py > GRID_H - 1.001) py = GRID_H - 1.001;
          const x0 = Math.floor(px);
          const y0 = Math.floor(py);
          const sx = px - x0;
          const sy = py - y0;
          const a = src[idx(x0, y0)];
          const b = src[idx(x0 + 1, y0)];
          const c = src[idx(x0, y0 + 1)];
          const d = src[idx(x0 + 1, y0 + 1)];
          out[i] =
            (a * (1 - sx) + b * sx) * (1 - sy) +
            (c * (1 - sx) + d * sx) * sy;
        }
      }
    };

    const injectMouse = () => {
      if (!hasMoved) return;
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.ceil(speed / 6));
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const px = lastMouseX + dx * t;
        const py = lastMouseY + dy * t;
        const gx = (px / width) * GRID_W;
        const gy = (py / height) * GRID_H;
        const fx = (dx / width) * GRID_W * 0.95;
        const fy = (dy / height) * GRID_H * 0.95;
        const radius = 5;
        const cx = Math.floor(gx);
        const cy = Math.floor(gy);
        for (let j = -radius; j <= radius; j++) {
          for (let i = -radius; i <= radius; i++) {
            const x = cx + i;
            const y = cy + j;
            if (x < 1 || y < 1 || x >= GRID_W - 1 || y >= GRID_H - 1) continue;
            const d2 = i * i + j * j;
            const fall = Math.exp(-d2 / 6);
            const k = idx(x, y);
            velX[k] += fx * fall * 0.7;
            velY[k] += fy * fall * 0.7;
            density[k] += 0.22 * fall;
          }
        }
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    let tTime = 0;
    const addAmbient = () => {
      tTime += 0.0045;
      for (let k = 0; k < 4; k++) {
        const gx = Math.floor(GRID_W * (0.5 + Math.sin(tTime + k * 1.9) * 0.4));
        const gy = Math.floor(GRID_H * (0.5 + Math.cos(tTime * 0.7 + k * 1.3) * 0.4));
        const ax = Math.cos(tTime * 1.2 + k * 0.9) * 0.8;
        const ay = Math.sin(tTime * 0.85 + k * 1.4) * 0.8;
        for (let j = -3; j <= 3; j++) {
          for (let i = -3; i <= 3; i++) {
            const x = gx + i;
            const y = gy + j;
            if (x < 1 || y < 1 || x >= GRID_W - 1 || y >= GRID_H - 1) continue;
            const fall = Math.exp(-(i * i + j * j) / 5);
            const kk = idx(x, y);
            velX[kk] += ax * fall * 0.05;
            velY[kk] += ay * fall * 0.05;
            density[kk] += 0.003 * fall;
          }
        }
      }
      const target = 0.45;
      for (let i = 0; i < size; i++) {
        density[i] += (target - density[i]) * 0.012;
      }
    };

    const step = () => {
      injectMouse();
      addAmbient();

      let tmp = velXPrev;
      velXPrev = velX;
      velX = tmp;
      tmp = velYPrev;
      velYPrev = velY;
      velY = tmp;
      advect(velX, velXPrev, velXPrev, velYPrev, 1);
      advect(velY, velYPrev, velXPrev, velYPrev, 1);

      const velDamp = 0.975;
      for (let i = 0; i < size; i++) {
        velX[i] *= velDamp;
        velY[i] *= velDamp;
      }

      tmp = densityPrev;
      densityPrev = density;
      density = tmp;
      advect(density, densityPrev, velX, velY, 1);
    };

    const uploadDensity = () => {
      // Scale density (roughly 0..1.5) to 0..255
      for (let i = 0; i < size; i++) {
        let d = density[i] * 170;
        if (d < 0) d = 0;
        if (d > 255) d = 255;
        densityBytes[i] = d;
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
        densityBytes
      );
    };

    let rafId = 0;
    const loop = () => {
      step();
      uploadDensity();

      gl.uniform2f(locTexSize, GRID_W, GRID_H);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.uniform1f(locTime, performance.now() * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      gl.deleteProgram(program);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className="melted-choc-canvas" aria-hidden="true" />;
}
