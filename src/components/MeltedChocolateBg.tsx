"use client";

import { useEffect, useRef } from "react";

/**
 * Fullscreen "melted chocolate" fluid background.
 *
 * Uses a low-resolution semi-Lagrangian fluid-like simulation:
 *   - A density (dye) field and velocity field on a coarse grid.
 *   - Mouse movement injects velocity + dye at the cursor.
 *   - Each frame the velocity advects itself (self-advection), and the dye
 *     is carried along by that velocity. Both decay gently.
 *   - The density is rendered as subtle brightness variation on a dark
 *     chocolate base, then upscaled + blurred so it reads as liquid swirls
 *     rather than pixels.
 *
 * Low-res grid + CSS blur keeps it smooth and fast; the simulation touches
 * ~9k cells per frame.
 */

const GRID_W = 160;
const GRID_H = 96;

export default function MeltedChocolateBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Offscreen low-res canvas for the sim output — we upscale it onto the main canvas.
    const sim = document.createElement("canvas");
    sim.width = GRID_W;
    sim.height = GRID_H;
    const simCtx = sim.getContext("2d", { alpha: false })!;
    const simImage = simCtx.createImageData(GRID_W, GRID_H);

    // Fields
    const size = GRID_W * GRID_H;
    let density = new Float32Array(size);
    let densityPrev = new Float32Array(size);
    let velX = new Float32Array(size);
    let velXPrev = new Float32Array(size);
    let velY = new Float32Array(size);
    let velYPrev = new Float32Array(size);

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    // Seed a gentle ambient swirl so the surface breathes without input
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const i = idx(x, y);
        const nx = x / GRID_W - 0.5;
        const ny = y / GRID_H - 0.5;
        velX[i] = -ny * 0.2;
        velY[i] = nx * 0.2;
        density[i] = 0.05 + Math.sin(x * 0.1 + y * 0.15) * 0.02;
      }
    }

    // Mouse tracking
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

    // Semi-Lagrangian advection: for each cell, trace velocity backward,
    // bilinearly sample the previous field at that point.
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

    // Inject mouse impulse — interpolate along the cursor's path so fast
    // moves still create a continuous stroke through the fluid.
    const injectMouse = () => {
      if (!hasMoved) return;
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.ceil(speed / 8));
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const px = lastMouseX + dx * t;
        const py = lastMouseY + dy * t;
        const gx = (px / width) * GRID_W;
        const gy = (py / height) * GRID_H;
        const fx = (dx / width) * GRID_W * 0.6;
        const fy = (dy / height) * GRID_H * 0.6;
        const radius = 3;
        const cx = Math.floor(gx);
        const cy = Math.floor(gy);
        for (let j = -radius; j <= radius; j++) {
          for (let i = -radius; i <= radius; i++) {
            const x = cx + i;
            const y = cy + j;
            if (x < 1 || y < 1 || x >= GRID_W - 1 || y >= GRID_H - 1) continue;
            const d2 = i * i + j * j;
            const fall = Math.exp(-d2 / 3.5);
            const k = idx(x, y);
            velX[k] += fx * fall * 0.45;
            velY[k] += fy * fall * 0.45;
            density[k] += 0.18 * fall;
          }
        }
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };


    // Subtle ambient turbulence so the fluid always drifts slightly
    let t = 0;
    const addAmbient = () => {
      t += 0.004;
      // Sparse injection points that slowly sweep with sine waves
      for (let k = 0; k < 3; k++) {
        const gx = Math.floor(GRID_W * (0.5 + Math.sin(t + k * 2.1) * 0.38));
        const gy = Math.floor(GRID_H * (0.5 + Math.cos(t * 0.7 + k * 1.3) * 0.38));
        const ax = Math.cos(t * 1.1 + k) * 0.4;
        const ay = Math.sin(t * 0.9 + k * 1.7) * 0.4;
        for (let j = -2; j <= 2; j++) {
          for (let i = -2; i <= 2; i++) {
            const x = gx + i;
            const y = gy + j;
            if (x < 1 || y < 1 || x >= GRID_W - 1 || y >= GRID_H - 1) continue;
            const fall = Math.exp(-(i * i + j * j) / 3);
            const kk = idx(x, y);
            velX[kk] += ax * fall * 0.03;
            velY[kk] += ay * fall * 0.03;
            density[kk] += 0.006 * fall;
          }
        }
      }
    };

    const step = () => {
      injectMouse();
      addAmbient();

      // Advect velocity by itself
      let tmp = velXPrev;
      velXPrev = velX;
      velX = tmp;
      tmp = velYPrev;
      velYPrev = velY;
      velY = tmp;
      advect(velX, velXPrev, velXPrev, velYPrev, 1);
      advect(velY, velYPrev, velXPrev, velYPrev, 1);

      // Damp velocity (viscosity)
      const velDamp = 0.992;
      for (let i = 0; i < size; i++) {
        velX[i] *= velDamp;
        velY[i] *= velDamp;
      }

      // Advect density by velocity
      tmp = densityPrev;
      densityPrev = density;
      density = tmp;
      advect(density, densityPrev, velX, velY, 1);

      // Density decay
      const densDamp = 0.994;
      for (let i = 0; i < size; i++) {
        density[i] *= densDamp;
      }
    };

    const render = () => {
      // Fill sim ImageData with chocolate tones modulated by density
      const data = simImage.data;
      // Base chocolate RGB
      const baseR = 34;
      const baseG = 20;
      const baseB = 14;
      for (let i = 0; i < size; i++) {
        const d = Math.min(density[i] * 1.5, 1);
        // Warm chocolate → slightly richer warm brown at high density
        const r = baseR + d * 90;
        const g = baseG + d * 52;
        const b = baseB + d * 28;
        const p = i * 4;
        data[p] = r;
        data[p + 1] = g;
        data[p + 2] = b;
        data[p + 3] = 255;
      }
      simCtx.putImageData(simImage, 0, 0);

      // Upscale to fullscreen; smoothing + a tiny bit of blur give it the
      // creamy liquid surface rather than a pixel grid look.
      ctx.filter = "blur(10px) saturate(1.05)";
      ctx.drawImage(sim, 0, 0, width, height);
      ctx.filter = "none";

      // Subtle vignette so edges sink into darkness
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.3,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vg.addColorStop(0, "rgba(0, 0, 0, 0)");
      vg.addColorStop(1, "rgba(0, 0, 0, 0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);
    };

    let rafId = 0;
    const loop = () => {
      step();
      render();
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
    };
  }, []);

  return <canvas ref={canvasRef} className="melted-choc-canvas" aria-hidden="true" />;
}
