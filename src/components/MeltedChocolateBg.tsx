"use client";

import { useEffect, useRef } from "react";

export default function MeltedChocolateBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Each blob has its own position that eases toward a target derived from the mouse.
    // Different lags/offsets make the goop feel fluid rather than pinned to the cursor.
    const blobState = [
      { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, ease: 0.045, offX: 0, offY: 0 },
      { x: 0.35, y: 0.5, tx: 0.35, ty: 0.5, ease: 0.03, offX: -0.12, offY: 0.05 },
      { x: 0.65, y: 0.5, tx: 0.65, ty: 0.5, ease: 0.035, offX: 0.14, offY: -0.06 },
      { x: 0.5, y: 0.3, tx: 0.5, ty: 0.3, ease: 0.025, offX: 0.02, offY: -0.18 },
      { x: 0.5, y: 0.7, tx: 0.5, ty: 0.7, ease: 0.028, offX: -0.04, offY: 0.18 },
    ];

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    // Ambient drift so it's alive even without mouse input
    let t = 0;
    const tick = () => {
      t += 0.008;
      const { x: mx, y: my } = mouseRef.current;

      blobState.forEach((b, i) => {
        const driftX = Math.sin(t + i * 1.3) * 0.04;
        const driftY = Math.cos(t * 0.8 + i * 0.9) * 0.04;
        b.tx = mx + b.offX + driftX;
        b.ty = my + b.offY + driftY;
        b.x += (b.tx - b.x) * b.ease;
        b.y += (b.ty - b.y) * b.ease;

        const el = blobsRef.current[i];
        if (el) {
          el.style.transform = `translate3d(${b.x * 100}%, ${b.y * 100}%, 0) translate(-50%, -50%)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="melted-choc-bg">
      {/* SVG filter that fuses blobs into a single molten surface */}
      <svg className="melted-choc-svg" aria-hidden="true">
        <defs>
          <filter id="melted-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="melted-choc-layer">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) blobsRef.current[i] = el;
            }}
            className={`melted-choc-blob blob-${i}`}
          />
        ))}
      </div>

      {/* Gold shimmer highlight on top */}
      <div className="melted-choc-shine" />
    </div>
  );
}
