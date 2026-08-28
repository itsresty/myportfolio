import "server-only";

import { createClient } from "@supabase/supabase-js";

export function createSupabasePublic() {
  // These reads run on the server. Supporting the non-NEXT_PUBLIC names
  // avoids silently falling back to bundled data when Vercel has only the
  // server-side Supabase variables configured.
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase public environment variables are not configured.");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}
