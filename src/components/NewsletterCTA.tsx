"use client";

import { useEffect, useRef, useState } from "react";
import { insertRow, SEND_EMAIL_URL, SEND_EMAIL_HEADERS } from "@/lib/supabase";

/**
 * "Join us" CTA that lives just below the hero. Closed state is a single
 * elegant button. When pressed it expands smoothly into a full newsletter
 * form. Submission writes to the Supabase `subscribers` table and asks
 * the `send-email` Edge Function to email the studio inbox.
 */

export default function NewsletterCTA() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = firstName.trim();
    if (!trimmedEmail) return;

    setBusy(true);
    setError(null);

    try {
      // 1. Save to subscribers table (RLS: anon insert allowed).
      const { error: dbErr } = await insertRow("subscribers", {
        email: trimmedEmail,
        first_name: trimmedName || null,
      });

      // Ignore unique-constraint duplicates — already subscribed is fine.
      if (dbErr && dbErr.code !== "23505") {
        throw new Error(dbErr.message);
      }

      // 2. Notify the studio inbox via the Edge Function.
      const resp = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: SEND_EMAIL_HEADERS,
        body: JSON.stringify({
          type: "subscribe",
          email: trimmedEmail,
          first_name: trimmedName,
        }),
      });
      if (!resp.ok) {
        const errText = await resp.text();
        // Don't block the user on a notification failure — they're saved.
        console.error("send-email failed:", errText);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
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
              className="mt-10 max-w-md mx-auto flex flex-col gap-5"
            >
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name (optional)"
                className="bg-transparent border-b border-[color:var(--rule)] py-3 text-base text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none focus:border-[color:var(--ink)] transition-colors text-center"
                aria-label="First name"
              />
              <div className="flex items-end border-b border-[color:var(--rule)] focus-within:border-[color:var(--ink)] transition-colors">
                <input
                  ref={inputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.address@somewhere.io"
                  className="flex-1 bg-transparent py-3 text-base text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none text-center"
                  aria-label="Email address"
                  disabled={busy}
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="text-[11px] tracking-[0.28em] uppercase font-mono text-[color:var(--ink)] hover:text-[color:var(--gold)] transition-colors py-3 px-2 whitespace-nowrap disabled:opacity-50"
                >
                  {busy ? "Sending…" : "Send →"}
                </button>
              </div>
              {error && (
                <p className="text-xs text-[color:var(--wine)] text-center">
                  {error}
                </p>
              )}
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
