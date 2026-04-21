"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(id);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(5,5,10,0.55)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(1.2)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(232, 221, 196, 0.10)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 items-center py-4 gap-4">
        {/* Left — wordmark + registration mark */}
        <div className="col-span-4 md:col-span-3 flex items-center gap-3">
          <span
            className="crosshair text-[color:var(--bone)]"
            aria-hidden="true"
          />
          <Link href="/" className="group flex items-baseline gap-3">
            <span
              className="font-editorial text-[color:var(--bone)] group-hover:text-[color:var(--gold)] transition-colors text-xl md:text-2xl italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1' }}
            >
              Syrena
            </span>
            <span className="hidden md:inline label-brut">/ Chocolate</span>
          </Link>
        </div>

        {/* Center — running UTC clock (design-forward meta) */}
        <div className="hidden md:flex col-span-6 justify-center">
          <span className="font-mono text-[10px] tracking-[0.38em] text-[color:var(--bone)]/45 tabular-nums">
            {time || "\u00A0"}  ·  N°07  ·  SPRING MMXXVI
          </span>
        </div>

        {/* Right — links */}
        <div className="col-span-8 md:col-span-3 flex items-center justify-end gap-6 md:gap-8 text-[10px] tracking-[0.3em] font-mono">
          <Link
            href="/articles"
            className="text-[color:var(--bone)]/70 hover:text-[color:var(--gold)] transition-colors duration-300"
          >
            JOURNAL
          </Link>
          <Link
            href="/shop"
            className="text-[color:var(--bone)]/70 hover:text-[color:var(--gold)] transition-colors duration-300"
          >
            INDEX
          </Link>
          <Link
            href="/about"
            className="text-[color:var(--bone)]/70 hover:text-[color:var(--gold)] transition-colors duration-300"
          >
            COLOPHON
          </Link>
        </div>
      </div>
    </nav>
  );
}
