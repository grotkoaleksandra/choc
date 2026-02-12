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

      {/* Center bean cracks open */}
      <div className={`choc-bean ${visible ? "crack" : ""}`}>
        <div className="choc-bean-half choc-bean-left">
          <svg viewBox="0 0 30 50" width="30" height="50">
            <path d="M28 5 Q30 25, 28 45 Q15 48, 8 40 Q2 30, 4 20 Q6 8, 15 3 Q22 0, 28 5Z" fill="var(--warm)" />
            <path d="M28 5 Q30 25, 28 45" stroke="var(--warm-light)" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </div>
        <div className="choc-bean-half choc-bean-right">
          <svg viewBox="0 0 30 50" width="30" height="50">
            <path d="M2 5 Q0 25, 2 45 Q15 48, 22 40 Q28 30, 26 20 Q24 8, 15 3 Q8 0, 2 5Z" fill="var(--warm)" />
            <path d="M2 5 Q0 25, 2 45" stroke="var(--warm-light)" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Gold dust particles */}
        {visible && (
          <div className="choc-dust">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="choc-particle"
                style={{
                  "--angle": `${i * 30}deg`,
                  "--dist": `${20 + Math.random() * 30}px`,
                  "--size": `${2 + Math.random() * 3}px`,
                  "--delay": `${0.4 + Math.random() * 0.3}s`,
                  "--dur": `${0.6 + Math.random() * 0.4}s`,
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
