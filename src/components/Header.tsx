"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          CHOC
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/articles" className="hover:text-accent transition-colors">
            Articles
          </Link>
          <Link href="/shop" className="hover:text-accent transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-foreground/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/articles" onClick={() => setMenuOpen(false)} className="hover:text-accent transition-colors">
            Articles
          </Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-accent transition-colors">
            Shop
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-accent transition-colors">
            About
          </Link>
        </nav>
      )}
    </header>
  );
}
