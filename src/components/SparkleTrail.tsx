"use client";

import { useEffect, useRef, useCallback } from "react";

export default function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSparkle = useRef(0);

  const createSparkle = useCallback((x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    const sparkle = document.createElement("div");
    const size = Math.random() * 6 + 3;
    const shapes = ["*", "\u2727", "\u2726", "\u00B7"];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    sparkle.textContent = shape;
    sparkle.style.cssText = `
      position: fixed;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      font-size: ${size + 6}px;
      color: var(--gold);
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      animation: sparkle ${0.6 + Math.random() * 0.4}s ease-out forwards;
      animation-delay: ${Math.random() * 0.05}s;
    `;

    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1200);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSparkle.current < 60) return;
      lastSparkle.current = now;
      createSparkle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [createSparkle]);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50" />;
}
