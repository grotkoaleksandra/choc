"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-10 md:gap-20 items-start">
        <div className="col-span-12 md:col-span-6">
          <ScrollReveal>
            <p className="eyebrow">Correspondence — Monthly</p>
            <h1
              className="font-display text-[color:var(--ink)] mt-6 leading-[0.95] tracking-[-0.02em] text-5xl md:text-7xl lg:text-[6rem]"
              style={{ fontWeight: 400 }}
            >
              Join <em className="italic">us</em>.
            </h1>
            <p className="mt-8 text-[color:var(--ink-muted)] leading-[1.7] text-base md:text-lg max-w-md">
              One letter a month. Studio notes, the bar of the season, a word
              or two from Aleksandra, and first dibs on the artist editions —
              before they go on the shop.
            </p>
            <p className="mt-6 text-[color:var(--ink-muted)] leading-[1.7] max-w-md text-sm">
              No promotions, no third parties, no noise. You can leave any
              time, of course.
            </p>

            <dl className="mt-16 space-y-5 text-sm max-w-sm">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Cadence</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  First Sunday of each month
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Length</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  A short read, under five minutes
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Readers</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  1,214 quiet subscribers
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 md:sticky md:top-28">
          <ScrollReveal delay={160}>
            <div className="card-frame p-8 md:p-10 bg-[color:var(--paper)]">
              {!submitted ? (
                <>
                  <p className="eyebrow">The Letter — Nº 01</p>
                  <h2
                    className="font-display text-[color:var(--ink)] mt-4 text-3xl md:text-4xl leading-[1.1]"
                    style={{ fontWeight: 400 }}
                  >
                    Subscribe.
                  </h2>

                  <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-8">
                    <div>
                      <label className="eyebrow block mb-3">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-3">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors"
                        required
                      />
                    </div>

                    <button type="submit" className="btn-basket mt-4">
                      <span>Subscribe</span>
                      <span>→</span>
                    </button>

                    <p className="text-xs text-[color:var(--ink-muted)] leading-[1.5] mt-2">
                      By subscribing you agree to receive one monthly letter
                      from Syrena Chocolate. We&rsquo;ll never share your
                      address.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-8">
                  <p className="eyebrow">Welcome</p>
                  <h2
                    className="font-display text-[color:var(--ink)] mt-4 text-3xl md:text-4xl leading-[1.15]"
                    style={{ fontWeight: 400 }}
                  >
                    A letter is on its <em className="italic">way</em>.
                  </h2>
                  <p className="mt-6 text-[color:var(--ink-muted)] leading-[1.7]">
                    Check {email || "your inbox"} for a note from the studio.
                    The first Sunday letter arrives with the next moon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                      setName("");
                    }}
                    className="mt-10 link-fancy text-sm"
                  >
                    ← Subscribe another address
                  </button>
                </div>
              )}
            </div>

            <p className="mt-6 eyebrow text-center">
              — Syrena Chocolate · Warszawa, est. 2020 —
            </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
