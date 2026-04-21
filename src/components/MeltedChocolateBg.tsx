"use client";

import { useEffect, useRef } from "react";

/**
 * Fullscreen "melted chocolate" fluid background.
 *
 * 2D fluid simulation on a coarse grid:
 *   - Velocity and dye density fields, both semi-Lagrangian advected.
 *   - Mouse movement injects velocity + dye along its path.
 *   - Ambient injection points keep it breathing with no input.
 *
 * The density field is then treated as a HEIGHT MAP and rendered with
 * Blinn-Phong-style lighting — surface normals come from the gradient of
 * density, a directional light produces diffuse + specular, so the liquid
 * gets glossy highlights and shadowed troughs that read as real 3D water.
 */

const GRID_W = 200;
const GRID_H = 120;

export default function MeltedChocolateBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Offscreen low-res canvas for the shaded sim — upscaled to the main canvas each frame
    const sim = document.createElement("canvas");
    sim.width = GRID_W;
    sim.height = GRID_H;
    const simCtx = sim.getContext("2d", { alpha: false })!;
    const simImage = simCtx.createImageData(GRID_W, GRID_H);

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

    // Seed a gentle ambient swirl + a starting baseline of liquid
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const i = idx(x, y);
        const nx = x / GRID_W - 0.5;
        const ny = y / GRID_H - 0.5;
        velX[i] = -ny * 0.3;
        velY[i] = nx * 0.3;
        density[i] =
          0.35 +
          Math.sin(x * 0.08 + y * 0.12) * 0.08 +
          Math.cos(x * 0.15 - y * 0.1) * 0.06;
      }
    }

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

    // Semi-Lagrangian advection with bilinear sampling
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

    // Inject mouse impulse interpolated along the cursor's recent path
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
        const fx = (dx / width) * GRID_W * 0.9;
        const fy = (dy / height) * GRID_H * 0.9;
        const radius = 4;
        const cx = Math.floor(gx);
        const cy = Math.floor(gy);
        for (let j = -radius; j <= radius; j++) {
          for (let i = -radius; i <= radius; i++) {
            const x = cx + i;
            const y = cy + j;
            if (x < 1 || y < 1 || x >= GRID_W - 1 || y >= GRID_H - 1) continue;
            const d2 = i * i + j * j;
            const fall = Math.exp(-d2 / 5);
            const k = idx(x, y);
            velX[k] += fx * fall * 0.6;
            velY[k] += fy * fall * 0.6;
            density[k] += 0.22 * fall;
          }
        }
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    // Slow ambient currents — multiple moving sources create the living surface
    let t = 0;
    const addAmbient = () => {
      t += 0.0045;
      for (let k = 0; k < 4; k++) {
        const gx = Math.floor(GRID_W * (0.5 + Math.sin(t + k * 1.9) * 0.4));
        const gy = Math.floor(GRID_H * (0.5 + Math.cos(t * 0.7 + k * 1.3) * 0.4));
        const ax = Math.cos(t * 1.2 + k * 0.9) * 0.8;
        const ay = Math.sin(t * 0.85 + k * 1.4) * 0.8;
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
      // Gentle drift back toward baseline so density doesn't explode or vanish
      const target = 0.4;
      for (let i = 0; i < size; i++) {
        density[i] += (target - density[i]) * 0.0015;
      }
    };

    const step = () => {
      injectMouse();
      addAmbient();

      // Self-advect velocity
      let tmp = velXPrev;
      velXPrev = velX;
      velX = tmp;
      tmp = velYPrev;
      velYPrev = velY;
      velY = tmp;
      advect(velX, velXPrev, velXPrev, velYPrev, 1);
      advect(velY, velYPrev, velXPrev, velYPrev, 1);

      // Viscosity
      const velDamp = 0.995;
      for (let i = 0; i < size; i++) {
        velX[i] *= velDamp;
        velY[i] *= velDamp;
      }

      // Advect density
      tmp = densityPrev;
      densityPrev = density;
      density = tmp;
      advect(density, densityPrev, velX, velY, 1);
    };

    // --- Lighting setup -----------------------------------------------------
    // Directional light coming from upper-left, slightly above the surface
    const LX = 0.55;
    const LY = -0.55;
    const LZ = 0.65;
    const LLen = Math.sqrt(LX * LX + LY * LY + LZ * LZ);
    const lx = LX / LLen;
    const ly = LY / LLen;
    const lz = LZ / LLen;
    // View: straight on (camera looking down)
    const vx = 0;
    const vy = 0;
    const vz = 1;
    // Half-vector for Blinn-Phong specular
    const HX = lx + vx;
    const HY = ly + vy;
    const HZ = lz + vz;
    const HLen = Math.sqrt(HX * HX + HY * HY + HZ * HZ);
    const hx = HX / HLen;
    const hy = HY / HLen;
    const hz = HZ / HLen;

    // How strongly density gradients bend the normal — bigger = rougher/more dramatic
    const NORMAL_STRENGTH = 3.2;
    const SHININESS = 48;

    // Chocolate palette
    // Ambient (deep shadow)
    const AMB_R = 14;
    const AMB_G = 8;
    const AMB_B = 5;
    // Diffuse (main chocolate body)
    const DIF_R = 130;
    const DIF_G = 75;
    const DIF_B = 35;
    // Specular (glossy cream-gold highlight)
    const SPC_R = 255;
    const SPC_G = 228;
    const SPC_B = 180;

    const render = () => {
      const data = simImage.data;

      for (let y = 0; y < GRID_H; y++) {
        for (let x = 0; x < GRID_W; x++) {
          // Boundary-safe neighbors
          const xL = x > 0 ? x - 1 : x;
          const xR = x < GRID_W - 1 ? x + 1 : x;
          const yU = y > 0 ? y - 1 : y;
          const yD = y < GRID_H - 1 ? y + 1 : y;

          const hL = density[idx(xL, y)];
          const hR = density[idx(xR, y)];
          const hU = density[idx(x, yU)];
          const hD = density[idx(x, yD)];
          const h = density[idx(x, y)];

          // Gradient (slope) of the height field
          const gx = (hR - hL) * NORMAL_STRENGTH;
          const gy = (hD - hU) * NORMAL_STRENGTH;

          // Surface normal — (-gradient, 1) normalized
          let nx = -gx;
          let ny = -gy;
          let nz = 1;
          const nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
          nx /= nl;
          ny /= nl;
          nz /= nl;

          // Diffuse (Lambert)
          let diff = nx * lx + ny * ly + nz * lz;
          if (diff < 0) diff = 0;

          // Specular (Blinn-Phong)
          let sdot = nx * hx + ny * hy + nz * hz;
          if (sdot < 0) sdot = 0;
          const spec = Math.pow(sdot, SHININESS);

          // Depth modulation — denser fluid reads as slightly richer base
          const depth = 0.6 + Math.min(h, 1.2) * 0.4;

          let r = AMB_R + DIF_R * diff * depth + SPC_R * spec;
          let g = AMB_G + DIF_G * diff * depth + SPC_G * spec;
          let b = AMB_B + DIF_B * diff * depth + SPC_B * spec;

          if (r > 255) r = 255;
          if (g > 255) g = 255;
          if (b > 255) b = 255;

          const p = (x + y * GRID_W) * 4;
          data[p] = r;
          data[p + 1] = g;
          data[p + 2] = b;
          data[p + 3] = 255;
        }
      }

      simCtx.putImageData(simImage, 0, 0);

      // Upscale with a smoothing blur — creamy liquid surface, no visible grid
      ctx.filter = "blur(6px) saturate(1.08) contrast(1.05)";
      ctx.drawImage(sim, 0, 0, width, height);
      ctx.filter = "none";

      // Soft vignette — lets the edges sink into darkness
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
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
