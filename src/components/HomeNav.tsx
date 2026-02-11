"use client";

import Link from "next/link";

export default function HomeNav() {
  return (
    <nav className="home-nav">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between py-5">
        <Link href="/" className="text-sm tracking-[0.3em] font-medium text-white/80 hover:text-white transition-colors duration-300">
          SYRENA CHOCOLATE
        </Link>
        <div className="flex items-center gap-8 text-xs tracking-[0.15em]">
          <Link href="/articles" className="text-white/50 hover:text-white transition-colors duration-300">
            JOURNAL
          </Link>
          <Link href="/shop" className="text-white/50 hover:text-white transition-colors duration-300">
            SHOP
          </Link>
          <Link href="/about" className="text-white/50 hover:text-white transition-colors duration-300">
            ABOUT
          </Link>
        </div>
      </div>
    </nav>
  );
}
