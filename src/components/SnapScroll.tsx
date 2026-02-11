"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SnapScrollProps {
  children: ReactNode;
}

export default function SnapScroll({ children }: SnapScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll<HTMLElement>(".snap-panel");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        root: container,
        threshold: 0.3,
      }
    );

    panels.forEach((panel) => observer.observe(panel));

    // Make hero visible immediately
    panels[0]?.classList.add("is-visible");

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="snap-container">
      {children}
    </div>
  );
}
