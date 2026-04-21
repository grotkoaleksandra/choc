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

  // As progress 0 → 1 the video letterboxes down to nothing and fades out
  // entirely — the hero fully disappears and the rest of the page takes over.
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const collapseBottom = progress * vh; // bottom inset grows to full viewport
  const videoOpacity = Math.max(1 - progress * 1.1, 0); // fade during final slice
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
      </div>

      {/* Vertical marginalia — left edge coordinates */}
      <div
        className="fixed left-4 md:left-6 top-0 z-10 pointer-events-none hidden md:flex h-screen items-center"
        style={{ opacity: copyOpacity }}
      >
        <span className="vert-text font-mono text-[10px] text-white/45">
          52.2297° N  ·  21.0122° E  —  ATELIER · WARSZAWA · POLSKA
        </span>
      </div>

      {/* Right-edge running meta */}
      <div
        className="fixed right-4 md:right-6 top-0 z-10 pointer-events-none hidden md:flex h-screen items-center"
        style={{ opacity: copyOpacity }}
      >
        <span className="vert-text-up font-mono text-[10px] text-white/45">
          N°07  /  48 EDITIONS  /  SPRING MMXXVI
        </span>
      </div>

      {/* Hero copy — sits in the fixed viewport, fades/slides out as you scroll */}
      <div
        className="fixed inset-0 z-10 pointer-events-none flex items-end pb-16 md:pb-20 px-6 md:px-16"
        style={{
          opacity: copyOpacity,
          transform: `translateY(${copyTranslate}px)`,
          transition: "opacity 60ms linear, transform 60ms linear",
        }}
      >
        <div className="w-full max-w-[1600px] mx-auto pointer-events-auto">
          {/* Top row — issue label + registration mark */}
          <div className="grid grid-cols-12 gap-4 mb-10 md:mb-16 items-end">
            <div className="col-span-6 md:col-span-3">
              <p className="label-brut text-white">
                ISSUE — 07 / XLVIII
              </p>
              <p className="label-brut mt-2 text-white/55">
                SPRING · MMXXVI
              </p>
            </div>
            <div className="hidden md:flex col-span-6 justify-center">
              <span className="crosshair text-white/70" />
            </div>
            <div className="col-span-6 md:col-span-3 text-right">
              <p className="label-brut text-white">
                SYRENA — BEAN TO BAR
              </p>
              <p className="label-brut mt-2 text-white/55">
                EST. MMXX · WARSZAWA
              </p>
            </div>
          </div>

          {/* Primary display — Fraunces italic WONK, oversized */}
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 md:col-span-9">
              <h1
                className="font-editorial text-white leading-[0.82] tracking-[-0.035em] text-[20vw] md:text-[13.5vw]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 1', fontStyle: "italic" }}
              >
                Syrena
              </h1>
              <h1
                className="font-editorial-tight text-white/70 leading-[0.82] tracking-[-0.04em] text-[20vw] md:text-[13.5vw] -mt-[2vw]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0' }}
              >
                Chocolate.
              </h1>
            </div>

            <div className="col-span-12 md:col-span-3 md:pl-8 md:border-l md:border-white/15">
              <p className="text-white/80 text-[13px] md:text-sm leading-[1.6] max-w-xs">
                A studio for fine chocolate, bean to bar —
                <em className="font-editorial italic text-[color:var(--gold)]"> slow craft</em>,
                single-origin cacao, and editions that refuse
                to repeat themselves.
              </p>
              <div className="mt-6 h-px bg-white/20 w-full" />
              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-white/55">
                Running time — 00:04:21
              </p>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="mt-10 md:mt-14 flex items-center justify-between gap-3 text-[10px] tracking-[0.4em] text-white/50 font-mono">
            <div className="flex items-center gap-3">
              <span className="inline-block w-10 h-px bg-white/40" />
              <span>SCROLL — IT COLLAPSES</span>
            </div>
            <span className="hidden md:inline">REEL 01 · TAKE 07</span>
          </div>
        </div>
      </div>
    </section>
  );
}
