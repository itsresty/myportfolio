import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getViewAnalytics } from "@/lib/view-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(getViewAnalytics(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
}
