"use client";

import Link from "next/link";

export default function HomeNav() {
  return (
    <nav className="home-nav">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between py-6">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <span className="text-gold text-sm transition-transform duration-500 group-hover:rotate-[360deg]">✦</span>
          <span className="font-display italic text-lg text-white/90 group-hover:text-white transition-colors">
            Syrena
          </span>
          <span className="hidden md:inline text-[9px] tracking-[0.4em] text-white/30">
            · CHOCOLATE ATELIER
          </span>
        </Link>
        <div className="flex items-center gap-8 text-[10px] tracking-[0.3em]">
          <Link href="/articles" className="text-white/50 hover:text-white transition-colors duration-300">
            <span className="text-white/30 mr-2">I.</span>JOURNAL
          </Link>
          <Link href="/shop" className="text-white/50 hover:text-white transition-colors duration-300">
            <span className="text-white/30 mr-2">II.</span>SHOP
          </Link>
          <Link href="/about" className="text-white/50 hover:text-white transition-colors duration-300">
            <span className="text-white/30 mr-2">III.</span>ABOUT
          </Link>
        </div>
      </div>
    </nav>
  );
}
