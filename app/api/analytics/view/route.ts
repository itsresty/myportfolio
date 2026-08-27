import { NextResponse } from "next/server";
import { recordPageView, touchVisitor } from "@/lib/view-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { visitorId?: string; pathname?: string; event?: "view" | "heartbeat" };
    if (!body.visitorId || !body.pathname) {
      return NextResponse.json({ error: "Missing view data." }, { status: 400 });
    }

    const analytics = body.event === "heartbeat"
      ? touchVisitor(body.visitorId, body.pathname)
      : recordPageView(body.visitorId, body.pathname);

    return NextResponse.json(analytics, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not record view." }, { status: 400 });
  }
}
