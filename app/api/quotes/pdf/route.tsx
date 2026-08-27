import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import { getAdminSession } from "@/lib/admin-auth";
import { getBusinessProfile, type BusinessProfile } from "@/lib/site-settings";
import type { Quote } from "@/lib/quotes";
import QuotePdfDocument from "@/components/quote-pdf-document";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DocumentType = "development" | "video";

function renderQuotePdf(quote: Quote, business: BusinessProfile, documentType: DocumentType) {
  return renderToBuffer(<QuotePdfDocument quote={quote} business={business} documentType={documentType} />);
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to the admin panel." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as { quote?: Quote; documentType?: DocumentType };

    if (!body?.quote) {
      return NextResponse.json(
        { error: "Missing quote data." },
        { status: 400 }
      );
    }

    const business = await getBusinessProfile();
    const documentType = body.documentType === "video" ? "video" : "development";
    const buffer = await renderQuotePdf(body.quote, business, documentType);

    const bytes = new Uint8Array(buffer);
    const filename = `${body.quote.quoteNumber || "estimate"}.pdf`;

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);

    return NextResponse.json(
      { error: "Could not generate the PDF. Please try again." },
      { status: 500 }
    );
  }
}
