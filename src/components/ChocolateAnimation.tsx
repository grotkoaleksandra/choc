"use client";

import { useEffect, useRef, useState } from "react";

export default function ChocolateAnimation() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="choc-anim-wrap" aria-hidden="true">
      {/* Left line draws in */}
      <div className={`choc-line choc-line-left ${visible ? "draw" : ""}`} />

      {/* Chocolate bar snaps in half */}
      <div className={`choc-bar ${visible ? "snap" : ""}`}>
        {/* Left half */}
        <div className="choc-bar-half choc-bar-left">
          <svg viewBox="0 0 48 36" width="48" height="36">
            {/* Bar body */}
            <rect x="0" y="0" width="48" height="36" rx="2" fill="var(--warm)" />
            {/* Score lines (chocolate squares) */}
            <line x1="16" y1="0" x2="16" y2="36" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            <line x1="32" y1="0" x2="32" y2="36" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="12" x2="48" y2="12" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="24" x2="48" y2="24" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            {/* Subtle highlight */}
            <rect x="1" y="1" width="46" height="4" rx="1" fill="var(--warm-light)" opacity="0.15" />
          </svg>
        </div>

        {/* Right half */}
        <div className="choc-bar-half choc-bar-right">
          <svg viewBox="0 0 48 36" width="48" height="36">
            <rect x="0" y="0" width="48" height="36" rx="2" fill="var(--warm)" />
            <line x1="16" y1="0" x2="16" y2="36" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            <line x1="32" y1="0" x2="32" y2="36" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="12" x2="48" y2="12" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="24" x2="48" y2="24" stroke="var(--warm-light)" strokeWidth="0.5" opacity="0.4" />
            <rect x="1" y="1" width="46" height="4" rx="1" fill="var(--warm-light)" opacity="0.15" />
          </svg>
        </div>

        {/* Snap crumbs */}
        {visible && (
          <div className="choc-dust">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="choc-particle"
                style={{
                  "--angle": `${180 + (i * 22.5 - 78)}deg`,
                  "--dist": `${14 + Math.random() * 20}px`,
                  "--size": `${2 + Math.random() * 2.5}px`,
                  "--delay": `${0.3 + Math.random() * 0.2}s`,
                  "--dur": `${0.5 + Math.random() * 0.3}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right line draws in */}
      <div className={`choc-line choc-line-right ${visible ? "draw" : ""}`} />
    </div>
  );
}
