"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="inline-block">
            <h1 className="text-sm tracking-[0.3em] font-medium">CHOC</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em]">
            <Link href="/articles" className="text-muted hover:text-foreground transition-colors duration-200">
              JOURNAL
            </Link>
            <Link href="/shop" className="text-muted hover:text-foreground transition-colors duration-200">
              SHOP
            </Link>
            <Link href="/about" className="text-muted hover:text-foreground transition-colors duration-200">
              ABOUT
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden text-xs tracking-[0.15em] text-muted hover:text-foreground transition-colors"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border-light px-6 py-6 flex flex-col items-start gap-4 text-xs tracking-[0.15em]">
          <Link href="/articles" onClick={() => setMenuOpen(false)} className="text-muted hover:text-foreground transition-colors">
            JOURNAL
          </Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-muted hover:text-foreground transition-colors">
            SHOP
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-muted hover:text-foreground transition-colors">
            ABOUT
          </Link>
        </nav>
      )}
    </header>
  );
}
