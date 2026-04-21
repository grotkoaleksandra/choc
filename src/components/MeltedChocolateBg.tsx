"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  age: number;
  life: number; // total frames to live
  radius: number;
  hue: number; // slight variation for depth
};

export default function MeltedChocolateBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

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
      // Paint initial base
      paintBase(1);
    };

    const paintBase = (alpha: number) => {
      // A dark chocolate bed. Low alpha = slow "flow back" so trails linger.
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, `rgba(26, 14, 8, ${alpha})`);
      g.addColorStop(0.5, `rgba(44, 24, 16, ${alpha})`);
      g.addColorStop(1, `rgba(13, 9, 6, ${alpha})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const trail: TrailPoint[] = [];
    let lastX = width / 2;
    let lastY = height / 2;
    let hasMoved = false;

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      // Interpolate between frames so fast moves still produce a continuous cut
      const steps = Math.max(1, Math.ceil(speed / 6));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = lastX + dx * t;
        const py = lastY + dy * t;
        trail.push({
          x: px,
          y: py,
          age: 0,
          life: 90 + Math.min(speed * 0.8, 40),
          radius: 45 + Math.min(speed * 1.4, 70),
          hue: Math.random() * 15 - 7,
        });
      }
      lastX = x;
      lastY = y;
    };

    let rafId = 0;
    const tick = () => {
      // Re-apply base at low alpha — this is the "liquid flowing back"
      ctx.globalCompositeOperation = "source-over";
      paintBase(0.08);

      // Draw trail points as warm highlights using "lighter" blend — a knife cut revealing brighter chocolate underneath
      ctx.globalCompositeOperation = "lighter";
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;
        const t = p.age / p.life;
        if (t >= 1) {
          trail.splice(i, 1);
          continue;
        }
        // Ease out — fast fade near the end, bright at the start
        const fade = Math.pow(1 - t, 1.4);
        // Radius grows a touch as the cut spreads
        const r = p.radius * (1 + t * 0.5);

        const base = 28 + p.hue; // hue offset for variety
        const rg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        // Warm caramel core → chocolate mid → transparent edge
        rg.addColorStop(0, `rgba(${180 + base}, ${115 + base * 0.5}, ${65 + base * 0.3}, ${0.55 * fade})`);
        rg.addColorStop(0.35, `rgba(${130 + base}, ${78 + base * 0.4}, ${42}, ${0.28 * fade})`);
        rg.addColorStop(1, "rgba(92, 58, 33, 0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // A slow ambient swirl so the surface looks alive without the mouse
      ctx.globalCompositeOperation = "lighter";
      const t = performance.now() * 0.00015;
      for (let i = 0; i < 3; i++) {
        const cx = width * (0.5 + Math.sin(t + i * 2.1) * 0.35);
        const cy = height * (0.5 + Math.cos(t * 0.8 + i * 1.7) * 0.35);
        const rr = 260 + Math.sin(t * 1.3 + i) * 40;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        g.addColorStop(0, "rgba(122, 74, 42, 0.08)");
        g.addColorStop(0.5, "rgba(92, 58, 33, 0.04)");
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="melted-choc-canvas" aria-hidden="true" />;
}
