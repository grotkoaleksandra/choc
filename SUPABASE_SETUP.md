# Supabase + Resend Setup

Static site on GitHub Pages — Supabase holds the data and runs the
Edge Function that calls Resend, so secret keys never end up in the
public bundle.

## 1. Create the database tables

In Supabase dashboard → **SQL Editor → New query**, paste the contents
of `supabase/migrations/001_subscribers_contacts.sql` and **Run**.
Creates `subscribers` and `contacts` tables with anon-insert RLS.

## 2. Set the Resend secret

Supabase dashboard → **Project Settings → Edge Functions → Secrets →
Add new secret**:

```
Name:  RESEND_API_KEY
Value: re_***  (paste your Resend key)
```

## 3. Deploy the `send-email` Edge Function

**Easy path** (no CLI needed):
1. Supabase dashboard → **Edge Functions → Deploy a new function**
2. Name: `send-email`
3. Toggle **Verify JWT with legacy secret** → **OFF** (the form submits
   without auth)
4. Paste contents of `supabase/functions/send-email/index.ts` → **Deploy**

**CLI path** (if you have the Supabase CLI installed):
```
supabase login
supabase link --project-ref jjmznnawgcdoobjelkun
supabase functions deploy send-email --no-verify-jwt
```

## 4. (Optional) Use a syrenachocolate.com sender address

Until you do this, emails come from `onboarding@resend.dev` (Resend's
default sandbox sender, which works but isn't branded).

To send from `hello@syrenachocolate.com`:

1. Own the `syrenachocolate.com` domain (buy via Namecheap / Cloudflare
   / Porkbun if you don't yet — ~$12/yr).
2. Resend dashboard → **Domains → Add Domain → `syrenachocolate.com`**.
3. Resend shows you DNS records (SPF, DKIM, MX). Add them to your
   domain's DNS provider. Wait for verification (usually < 1 hour).
4. In `supabase/functions/send-email/index.ts`, change:
   ```ts
   const FROM = "Syrena Chocolate <onboarding@resend.dev>";
   ```
   to:
   ```ts
   const FROM = "Syrena Chocolate <hello@syrenachocolate.com>";
   ```
   Redeploy the function.

### Receiving email at hello@syrenachocolate.com

Verifying the domain in Resend lets you _send_ from it but not _receive_.
For receiving, two cheap options:

- **Cloudflare Email Routing (free):** Add the domain to Cloudflare,
  enable Email Routing, forward `hello@syrenachocolate.com` →
  `grotkowskaaleksandra3@gmail.com`. Replies will come from your gmail
  (you can also configure gmail "Send as" to use the syrena address).
- **Google Workspace ($6/user/mo):** Real branded inbox, calendar, etc.

## 5. After everything works — rotate the Resend key

Because the API key was shared in a chat, generate a new one in Resend,
update the `RESEND_API_KEY` Supabase secret, and revoke the old key.
