// Minimal Supabase client — just `fetch` against the REST + Functions APIs.
// No SDK install needed. Both keys below are public-safe (the publishable
// key is gated by Row-Level Security on the database side).

const SUPABASE_URL = "https://jjmznnawgcdoobjelkun.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_WO_CukkcGRTVVDt2xY7a3g_XnejFMqf";

const baseHeaders = {
  apikey: SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
  "Content-Type": "application/json",
};

/** Result shape mirrors @supabase/supabase-js for compatibility. */
export type InsertResult = {
  error: { message: string; code?: string } | null;
};

/** Insert a single row into a public table via PostgREST. */
export async function insertRow(
  table: string,
  row: Record<string, unknown>,
): Promise<InsertResult> {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...baseHeaders, Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  if (resp.ok) return { error: null };

  // Try to read PostgREST's JSON error shape
  try {
    const body = await resp.json();
    return {
      error: {
        message: body.message || body.error || resp.statusText,
        code: body.code,
      },
    };
  } catch {
    const text = await resp.text();
    return { error: { message: text || resp.statusText } };
  }
}

/** Edge Function endpoint for the send-email function */
export const SEND_EMAIL_URL = `${SUPABASE_URL}/functions/v1/send-email`;

/** Headers needed when calling the Edge Function */
export const SEND_EMAIL_HEADERS = {
  "Content-Type": "application/json",
  apikey: SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
};
