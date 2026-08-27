import crypto from "crypto";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

const BUCKET = "portfolio";

export async function uploadPortfolioFile(file: File, folder: "posts" | "projects" | "videos") {
  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const objectPath = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await createSupabaseAdmin().storage.from(BUCKET).upload(
    objectPath,
    Buffer.from(await file.arrayBuffer()),
    { contentType: file.type, upsert: false }
  );
  if (error) throw new Error(error.message);
  return createSupabaseAdmin().storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
}

export async function deletePortfolioFile(url?: string) {
  if (!url) return;
  try {
    const pathname = new URL(url).pathname;
    const prefix = `/storage/v1/object/public/${BUCKET}/`;
    const index = pathname.indexOf(prefix);
    if (index < 0) return;
    const objectPath = decodeURIComponent(pathname.slice(index + prefix.length));
    await createSupabaseAdmin().storage.from(BUCKET).remove([objectPath]);
  } catch {
    // Existing local or external URLs do not belong to Supabase Storage.
  }
}
