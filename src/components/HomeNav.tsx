"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(28, 40, 51, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between py-5">
        <Link
          href="/"
          className="flex items-baseline gap-3 group transition-opacity duration-500"
          style={{
            opacity: scrolled ? 1 : 0,
            pointerEvents: scrolled ? "auto" : "none",
          }}
          aria-hidden={!scrolled}
          tabIndex={scrolled ? 0 : -1}
        >
          <span
            className="font-display text-[color:var(--ink)] text-2xl md:text-3xl leading-none group-hover:opacity-70 transition-opacity"
            style={{ fontWeight: 400 }}
          >
            Syrena
          </span>
          <span className="hidden md:inline eyebrow">Chocolate</span>
        </Link>

        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href="/articles"
            className="hidden sm:inline text-[13px] text-[color:var(--ink)] hover:text-[color:var(--wine)] transition-colors"
          >
            Journal
          </Link>
          <Link
            href="/shop"
            className="text-[13px] text-[color:var(--ink)] hover:text-[color:var(--wine)] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="hidden sm:inline text-[13px] text-[color:var(--ink)] hover:text-[color:var(--wine)] transition-colors"
          >
            About
          </Link>
          <Link
            href="/newsletter"
            className="text-[13px] text-[color:var(--ink)] hover:text-[color:var(--wine)] transition-colors italic font-display"
          >
            Join us
          </Link>

          <span className="hidden md:inline w-px h-4 bg-[color:var(--rule)]" />

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-mono text-[color:var(--ink)] hover:text-[color:var(--wine)] transition-colors"
            aria-label="Basket"
          >
            <span className="hidden sm:inline">Basket</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[color:var(--rule)] text-[10px] font-mono group-hover:border-[color:var(--wine)] transition-colors">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
