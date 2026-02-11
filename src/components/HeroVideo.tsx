"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroVideo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-video-wrap">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setLoaded(true)}
        className="will-change-transform"
        src="/choc/hero.mp4"
      >
      </video>

      {/* Dark gradient overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content max-w-7xl mx-auto">
        <div
          className="max-w-xl transition-all duration-1000 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-[10px] tracking-[0.4em] text-white/50 mb-4">
            A CHOCOLATE JOURNAL & APOTHECARY
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] italic mb-6">
            CHOC
          </h1>
          <p className="font-body text-sm md:text-base text-white/70 leading-relaxed max-w-md mb-8">
            Stories, craft, and fine chocolate. From the ancient forests of Mesoamerica to your hands.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/articles"
              className="text-xs tracking-[0.2em] text-white border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
            >
              READ THE JOURNAL
            </Link>
            <Link
              href="/shop"
              className="text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 link-fancy"
            >
              SHOP
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000"
          style={{ opacity: loaded ? 1 : 0, transitionDelay: "1.2s" }}
        >
          <span className="text-[9px] tracking-[0.3em] text-white/30">SCROLL</span>
          <div className="scroll-indicator text-white/30 text-lg">&#8595;</div>
        </div>
      </div>
    </section>
  );
}
