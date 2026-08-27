import "server-only";

import { createClient } from "@supabase/supabase-js";

function required(name: "SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_URL" | "SUPABASE_SECRET_KEY" | "SUPABASE_SERVICE_ROLE_KEY") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured. Add it to .env.local and Vercel environment variables.`);
  return value;
}

/** Server-only client; call it only after requireAdmin() in mutations. */
export function createSupabaseAdmin() {
  const url = process.env.SUPABASE_URL ?? required("NEXT_PUBLIC_SUPABASE_URL");
  const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("SUPABASE_SECRET_KEY is not configured. Add it to .env.local and Vercel environment variables.");
  return createClient(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
