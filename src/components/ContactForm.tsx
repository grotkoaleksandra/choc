"use client";

import { useState } from "react";
import { insertRow, SEND_EMAIL_URL, SEND_EMAIL_HEADERS } from "@/lib/supabase";

/**
 * Colophon contact form. Submits to Supabase `contacts` table and pings the
 * `send-email` Edge Function so the studio inbox is notified — with the
 * sender's address set as `reply_to`, so hitting reply in your inbox just
 * goes back to the visitor.
 */

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();
    if (!n || !em || !msg) return;

    setBusy(true);
    setError(null);

    try {
      const { error: dbErr } = await insertRow("contacts", {
        name: n,
        email: em,
        message: msg,
      });
      if (dbErr) throw new Error(dbErr.message);

      const resp = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: SEND_EMAIL_HEADERS,
        body: JSON.stringify({ type: "contact", name: n, email: em, message: msg }),
      });
      if (!resp.ok) {
        const errText = await resp.text();
        console.error("send-email failed:", errText);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <p className="eyebrow text-[color:var(--gold)]">Letter received</p>
        <h3
          className="mt-3 font-display text-[color:var(--ink)] text-3xl md:text-4xl leading-[1.0] tracking-[-0.015em]"
          style={{ fontWeight: 400 }}
        >
          Thank you, <em className="italic">{name || "friend"}</em>.
        </h3>
        <p className="mt-3 text-sm text-[color:var(--ink-muted)] max-w-sm leading-[1.7]">
          We answer every letter — usually within a week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div>
        <label className="eyebrow block mb-3" htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={busy}
          className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors"
        />
      </div>
      <div>
        <label className="eyebrow block mb-3" htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors"
        />
      </div>
      <div>
        <label className="eyebrow block mb-3" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={busy}
          className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors resize-none"
        />
      </div>
      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={busy}
          className="text-sm text-[color:var(--ink)] link-fancy disabled:opacity-50"
        >
          {busy ? "Sending…" : "Send letter →"}
        </button>
        {error && (
          <span className="text-xs text-[color:var(--wine)]">{error}</span>
        )}
      </div>
    </form>
  );
}
