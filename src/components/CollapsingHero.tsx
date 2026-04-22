"use client";

import { useEffect, useState } from "react";

export default function CollapsingHero() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(window.scrollY / vh, 1));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const collapseBottom = progress * vh;
  const videoOpacity = Math.max(1 - progress * 1.1, 0);
  const copyOpacity = Math.max(1 - progress * 1.8, 0);

  return (
    <section
      className="relative"
      style={{ height: "100vh" }}
      aria-label="Introduction"
    >
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          clipPath: `inset(0 0 ${collapseBottom}px 0)`,
          opacity: videoOpacity,
          transition: "clip-path 60ms linear, opacity 60ms linear",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 900ms ease-out",
            transform: `scale(${1 + progress * 0.03})`,
          }}
          src="/choc/hero.mp4"
        />
      </div>

      <div
        className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center px-6"
        style={{
          opacity: copyOpacity,
          transition: "opacity 60ms linear",
        }}
      >
        <h1
          className="font-display text-white text-center leading-[0.95] tracking-[-0.02em] text-[16vw] md:text-[12vw]"
          style={{
            fontWeight: 400,
            textShadow: "0 2px 40px rgba(0,0,0,0.25)",
          }}
        >
          Syrena <em className="italic">Chocolate</em>
        </h1>
      </div>
    </section>
  );
}
