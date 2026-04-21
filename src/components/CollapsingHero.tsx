"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-screen video hero that collapses entirely as the user scrolls.
 * Over one viewport of scroll, the clip-path closes from the bottom up
 * while the container fades so nothing is left behind — the cream page
 * below takes over cleanly.
 */

export default function CollapsingHero() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);

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
  const copyTranslate = progress * -32;

  return (
    <section
      ref={rangeRef}
      className="relative"
      style={{ height: "100vh" }}
      aria-label="Introduction"
    >
      {/* Fixed full-viewport video that clips away to nothing */}
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
        {/* Warm gradient overlay — carries the text without crushing the image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,22,16,0.10) 0%, rgba(30,22,16,0.30) 55%, rgba(30,22,16,0.65) 100%)",
          }}
        />
      </div>

      {/* Hero copy — calm, centered on the video */}
      <div
        className="fixed inset-0 z-10 pointer-events-none flex flex-col px-6 md:px-10"
        style={{
          opacity: copyOpacity,
          transform: `translateY(${copyTranslate}px)`,
          transition: "opacity 60ms linear, transform 60ms linear",
        }}
      >
        <div className="flex-1" />
        <div className="w-full max-w-[1400px] mx-auto pb-20 md:pb-28 pointer-events-auto">
          <p className="eyebrow" style={{ color: "rgba(245, 238, 224, 0.75)" }}>
            Syrena Chocolate — Est. 2020, Warszawa
          </p>
          <h1
            className="font-display text-white mt-6 leading-[0.95] tracking-[-0.02em] text-[14vw] md:text-[9vw] lg:text-[8vw]"
            style={{ fontWeight: 400, maxWidth: "18ch" }}
          >
            Chocolate, <em className="italic">slowly</em> made.
          </h1>
          <p className="mt-8 text-white/80 text-base md:text-lg max-w-md leading-[1.6]">
            A studio for fine chocolate, bean to bar. Single-origin cacao,
            small editions, and the patience it takes.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <span
              className="scroll-indicator inline-block w-10 h-px"
              style={{ background: "rgba(245, 238, 224, 0.7)" }}
            />
            <span
              className="eyebrow"
              style={{ color: "rgba(245, 238, 224, 0.7)" }}
            >
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
