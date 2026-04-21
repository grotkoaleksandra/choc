"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-screen video hero that elegantly collapses into a horizontal strip
 * across the top of the page as the user scrolls.
 *
 * - The wrapper section reserves one viewport of scroll room so there is a
 *   range for the collapse to animate over.
 * - The actual video lives in a fixed-position inner element so it stays
 *   pinned to the viewport while that range scrolls past.
 * - Progress (0 → 1) over that range drives a clip-path letterbox that
 *   narrows the video to a thin band at the top of the screen, fades the
 *   hero copy out, and scales slightly for depth.
 * - After the range, the video becomes a persistent sticky band that
 *   remains behind the page as an ambient ribbon.
 */

export default function CollapsingHero() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      // Collapse happens over 1 viewport of scrolling
      const p = Math.max(0, Math.min(window.scrollY / vh, 1));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // As progress 0 → 1 the video letterboxes down to a thin strip.
  // Target collapsed strip ≈ 110px tall, pinned to the top of the viewport.
  const stripHeight = 110; // px
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const collapseBottom = progress * Math.max(vh - stripHeight, 0); // bottom inset grows
  const copyOpacity = Math.max(1 - progress * 1.8, 0);
  const copyTranslate = progress * -40;

  // Nav gets a subtle backdrop once the video has started collapsing
  return (
    <section
      ref={rangeRef}
      className="relative"
      style={{ height: "100vh" }}
      aria-label="Introduction"
    >
      {/* Fixed full-viewport video that clips to a strip */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          clipPath: `inset(0 0 ${collapseBottom}px 0)`,
          transition: "clip-path 60ms linear",
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
            transform: `scale(${1 + progress * 0.04})`,
          }}
          src="/choc/hero.mp4"
        />
        {/* Gradient overlay — darker at bottom to carry the text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.70) 100%)",
          }}
        />
        {/* Subtle grain overlay for that film-stock feel */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px",
          }}
        />
        {/* A hairline rule at the bottom of the collapsed strip */}
        <div
          className="absolute left-0 right-0 h-px bg-white/15"
          style={{ bottom: `${collapseBottom}px` }}
        />
      </div>

      {/* Hero copy — sits in the fixed viewport, fades/slides out as you scroll */}
      <div
        className="fixed inset-0 z-10 pointer-events-none flex items-end pb-20 md:pb-28 px-6 md:px-12"
        style={{
          opacity: copyOpacity,
          transform: `translateY(${copyTranslate}px)`,
          transition: "opacity 60ms linear, transform 60ms linear",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto pointer-events-auto">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-[10px] tracking-[0.45em] text-white/55 mb-5">
                EST. MMXX  ·  WARSZAWA
              </p>
              <h1
                className="font-display text-white leading-[0.9] tracking-[-0.015em] text-[13vw] md:text-[10vw] lg:text-[8.5vw]"
                style={{ fontWeight: 400 }}
              >
                Syrena Chocolate
              </h1>
              <p className="mt-6 text-white/70 text-sm md:text-base max-w-md leading-[1.55]">
                A studio for fine chocolate, bean to bar. Slow craft,
                single-origin cacao, and limited editions.
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
              <span className="text-[10px] tracking-[0.4em] text-white/40">
                EDITION N°07
              </span>
              <span className="text-[10px] tracking-[0.4em] text-white/40">
                SPRING MMXXVI
              </span>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mt-14 flex items-center gap-3 text-[10px] tracking-[0.4em] text-white/40">
            <span className="inline-block w-10 h-px bg-white/30" />
            <span>SCROLL TO CONTINUE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
