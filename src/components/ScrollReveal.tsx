"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale" | "bounce" | "spin-left" | "spin-right" | "pop" | "flip" | "wobble";
  delay?: number;
  wipe?: boolean;
}

export default function ScrollReveal({ children, className = "", variant = "up", delay = 0, wipe = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = {
    up: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
    bounce: "reveal-bounce",
    "spin-left": "reveal-spin-left",
    "spin-right": "reveal-spin-right",
    pop: "reveal-pop",
    flip: "reveal-flip",
    wobble: "reveal-wobble",
  }[variant];

  const wipeClass = wipe ? " img-wipe" : "";

  return (
    <div ref={ref} className={`${variantClass}${wipeClass} ${className}`}>
      {children}
    </div>
  );
}
