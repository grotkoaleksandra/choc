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
        backgroundColor: scrolled ? "rgba(236, 228, 211, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.05)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(45, 35, 28, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between py-5">
        <Link href="/" className="flex items-baseline gap-3 group">
          <span
            className="font-display text-[color:var(--ink)] text-2xl md:text-3xl leading-none group-hover:opacity-70 transition-opacity"
            style={{ fontWeight: 400 }}
          >
            Syrena
          </span>
          <span className="hidden md:inline eyebrow">Chocolate</span>
        </Link>

        <div className="flex items-center gap-8 md:gap-12">
          <Link
            href="/articles"
            className="text-[13px] text-[color:var(--ink)] hover:text-[color:var(--wine)] transition-colors"
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
            className="text-[13px] text-[color:var(--ink)] hover:text-[color:var(--wine)] transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
