// Supabase Edge Function: send-email
//
// Receives a POST with { type: "subscribe" | "contact", ...fields } and emails
// the studio inbox via Resend. The Resend API key lives only in the function's
// environment (Supabase secrets) — never in the frontend code.
//
// Deploy:
//   supabase functions deploy send-email --no-verify-jwt
//
// Or paste this file's contents into the Supabase dashboard:
//   Edge Functions → New function → name "send-email" → set
//   "Verify JWT with legacy secret" to OFF → paste & deploy.
//
// Set the Resend key once:
//   Project Settings → Edge Functions → Secrets → Add
//     RESEND_API_KEY = re_***
//
// or via CLI:  supabase secrets set RESEND_API_KEY=re_***

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Where notifications land
const NOTIFY_TO = "grotkowskaaleksandra3@gmail.com";

// Until you verify a custom domain in Resend, use their default sandbox
// sender — `onboarding@resend.dev`. Once you verify e.g. syrenachocolate.com,
// change this to `Syrena Chocolate <hello@syrenachocolate.com>`.
const FROM = "Syrena Chocolate <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const escape = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }
  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "RESEND_API_KEY not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  let body: Record<string, string> & { type?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders });
  }

  const { type } = body;
  let subject = "";
  let html = "";
  let reply_to: string | undefined;

  if (type === "subscribe") {
    const email = (body.email || "").trim();
    const first_name = (body.first_name || "").trim();
    if (!email) {
      return new Response("Missing email", { status: 400, headers: corsHeaders });
    }
    subject = `New subscriber — ${first_name || email}`;
    html = `
      <h2 style="font-family: Georgia, serif; color: #1a1510;">New newsletter subscriber</h2>
      <p><strong>Email:</strong> ${escape(email)}</p>
      ${first_name ? `<p><strong>Name:</strong> ${escape(first_name)}</p>` : ""}
      <p style="color: #6f6458; font-size: 12px;">Sent from syrenachocolate.com</p>
    `;
  } else if (type === "contact") {
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();
    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400, headers: corsHeaders });
    }
    subject = `Letter from ${name}`;
    reply_to = email;
    html = `
      <h2 style="font-family: Georgia, serif; color: #1a1510;">New contact form letter</h2>
      <p><strong>Name:</strong> ${escape(name)}</p>
      <p><strong>Email:</strong> ${escape(email)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escape(message)}</p>
      <p style="color: #6f6458; font-size: 12px;">Reply directly to this email to respond.</p>
    `;
  } else {
    return new Response("Invalid type", { status: 400, headers: corsHeaders });
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: NOTIFY_TO,
      subject,
      html,
      ...(reply_to ? { reply_to } : {}),
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
