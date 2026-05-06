"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Join us" CTA that lives just below the hero. Closed state is a single
 * elegant button. When pressed it expands smoothly into a full newsletter
 * form (eyebrow, headline, copy, email field, submit). Submitting flips
 * to a small confirmation state.
 *
 * Pure client component — no backend; in real life you'd POST the email
 * somewhere on submit.
 */

export default function NewsletterCTA() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      // Focus the email input when the form expands
      inputRef.current.focus();
    }
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      className="relative border-t border-[color:var(--rule)]/60 px-6 md:px-10"
      aria-label="Newsletter signup"
    >
      <div className="max-w-[800px] mx-auto py-12 md:py-16 text-center">
        {submitted ? (
          <div>
            <p className="eyebrow text-[color:var(--gold)]">Thank you</p>
            <h2
              className="mt-3 font-display text-[color:var(--ink)] leading-[1.0] text-3xl md:text-5xl tracking-[-0.015em]"
              style={{ fontWeight: 400 }}
            >
              You&rsquo;re on the <em className="italic">list</em>.
            </h2>
            <p className="mt-3 text-sm text-[color:var(--ink-muted)]">
              The next letter is in May.
            </p>
          </div>
        ) : !open ? (
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 border border-[color:var(--ink)] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--background)] transition-colors duration-300"
            aria-expanded="false"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase font-mono">
              Join Our Newsletter
            </span>
            <span className="text-[11px] font-mono transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        ) : (
          <div className="newsletter-expand">
            <p className="eyebrow text-[color:var(--ink-muted)]">
              Newsletter — Letters from the atelier
            </p>
            <h2
              className="mt-3 font-display text-[color:var(--ink)] leading-[1.0] text-3xl md:text-5xl tracking-[-0.015em]"
              style={{ fontWeight: 400 }}
            >
              Join the <em className="italic">Syrena</em> letter.
            </h2>
            <p className="mt-4 text-sm text-[color:var(--ink-muted)] max-w-md mx-auto leading-[1.7]">
              Three or four letters a year — new editions, occasional essays,
              tasting notes, no noise.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-10 flex items-end gap-0 max-w-md mx-auto border-b border-[color:var(--rule)] focus-within:border-[color:var(--gold)] transition-colors"
            >
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.address@somewhere.io"
                className="flex-1 bg-transparent py-3 text-base text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.28em] uppercase font-mono text-[color:var(--ink)] hover:text-[color:var(--gold)] transition-colors py-3 px-2 whitespace-nowrap"
              >
                Send →
              </button>
            </form>

            <button
              onClick={() => setOpen(false)}
              className="mt-8 text-[11px] tracking-[0.28em] uppercase font-mono text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] transition-colors"
              aria-label="Close newsletter form"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .newsletter-expand {
          animation: newsletterIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes newsletterIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
