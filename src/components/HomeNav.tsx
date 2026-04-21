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
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.55)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="font-display text-white/90 group-hover:text-white transition-colors text-lg md:text-xl"
            style={{ fontWeight: 400 }}
          >
            Syrena
          </span>
          <span className="hidden md:inline text-[10px] tracking-[0.35em] text-white/30 font-mono">
            CHOCOLATE
          </span>
        </Link>
        <div className="flex items-center gap-7 md:gap-10 text-[10px] tracking-[0.3em]">
          <Link href="/articles" className="text-white/60 hover:text-white transition-colors duration-300">
            JOURNAL
          </Link>
          <Link href="/shop" className="text-white/60 hover:text-white transition-colors duration-300">
            SHOP
          </Link>
          <Link href="/about" className="text-white/60 hover:text-white transition-colors duration-300">
            ABOUT
          </Link>
        </div>
      </div>
    </nav>
  );
}
