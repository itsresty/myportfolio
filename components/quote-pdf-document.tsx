import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import type { Quote } from "@/lib/quote-utils";
import type { BusinessProfile } from "@/lib/site-settings";
import {
  formatCurrency,
  formatDate,
  getQuoteBalance,
  getQuoteDeposit,
  getQuoteDiscount,
  getQuoteSubtotal,
  getQuoteTax,
  getQuoteTotal,
} from "@/lib/quote-utils";

const slate = {
  background: "#102a43",
  accent: "#0f766e",
  accentSoft: "#ecfdf5",
  surface: "#f7fafc",
  line: "#d9e2ec",
  text: "#243b53",
  muted: "#627d98",
  faint: "#829ab1",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: slate.text,
    backgroundColor: "#ffffff",
    paddingTop: 34,
    paddingHorizontal: 40,
    paddingBottom: 48,
  },
  topRule: {
    height: 6,
    backgroundColor: slate.accent,
    marginHorizontal: -40,
    marginTop: -34,
    marginBottom: 28,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: slate.line,
  },
  brandBlock: {
    maxWidth: "55%",
  },
  brandName: {
    fontSize: 18,
    fontWeight: 700,
    color: slate.background,
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 8,
    color: slate.muted,
    marginTop: 3,
  },
  brandContact: {
    fontSize: 7.5,
    color: slate.faint,
    marginTop: 8,
    lineHeight: 1.5,
  },
  docMeta: {
    alignItems: "flex-end",
    maxWidth: "38%",
  },
  docLabel: {
    fontSize: 18,
    fontWeight: 700,
    color: slate.background,
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    minWidth: 148,
  },
  metaKey: {
    fontSize: 7.5,
    color: slate.faint,
    fontWeight: 500,
  },
  metaValue: {
    fontSize: 8.5,
    color: slate.text,
    fontWeight: 700,
  },
  titleBlock: {
    marginTop: 26,
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: slate.background,
  },
  statusPill: {
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  parties: {
    flexDirection: "row",
    marginTop: 26,
  },
  partyBlock: {
    width: "50%",
  },
  partyLabel: {
    fontSize: 7.5,
    fontWeight: 700,
    color: slate.faint,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  partyName: {
    fontSize: 10.5,
    fontWeight: 700,
    color: slate.text,
  },
  partyLine: {
    fontSize: 8,
    color: slate.muted,
    marginTop: 1.5,
    lineHeight: 1.5,
  },
  tableWrap: {
    marginTop: 28,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: slate.background,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  headCell: {
    fontSize: 7.5,
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  colDescription: {
    width: "30%",
  },
  colDetails: {
    width: "34%",
  },
  colQty: {
    width: "10%",
    textAlign: "right",
  },
  colRate: {
    width: "12%",
    textAlign: "right",
  },
  colAmount: {
    width: "14%",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: slate.line,
    alignItems: "center",
  },
  cellText: {
    fontSize: 8,
    color: slate.text,
  },
  cellMuted: {
    fontSize: 7.5,
    color: slate.muted,
  },
  cellStrong: {
    fontSize: 8,
    fontWeight: 700,
    color: slate.text,
  },
  totals: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },
  totalsInner: {
    width: "42%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3.5,
  },
  totalKey: {
    fontSize: 8,
    color: slate.muted,
  },
  totalValue: {
    fontSize: 8.5,
    color: slate.text,
    fontWeight: 500,
  },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: slate.accent,
  },
  grandKey: {
    fontSize: 10,
    fontWeight: 700,
    color: slate.accent,
  },
  grandValue: {
    fontSize: 12,
    fontWeight: 700,
    color: slate.accent,
  },
  depositRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: slate.accentSoft,
  },
  depositKey: {
    fontSize: 8.5,
    fontWeight: 700,
    color: slate.text,
  },
  depositValue: {
    fontSize: 9,
    fontWeight: 700,
    color: slate.text,
  },
  notes: {
    marginTop: 28,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: slate.line,
  },
  scope: {
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: slate.line,
  },
  scopeItem: {
    fontSize: 8,
    color: slate.muted,
    lineHeight: 1.6,
    marginTop: 3,
  },
  notesLabel: {
    fontSize: 7.5,
    fontWeight: 700,
    color: slate.faint,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  notesText: {
    fontSize: 8,
    color: slate.muted,
    lineHeight: 1.7,
  },
  footer: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: slate.line,
  },
  footerText: {
    fontSize: 7,
    color: slate.faint,
  },
  paymentLabel: {
    fontSize: 7.5,
    color: slate.faint,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 3,
  },
});

const STATUS_COLORS: Record<
  Quote["status"],
  { bg: string; text: string }
> = {
  draft: { bg: "#f1f5f9", text: "#475569" },
  sent: { bg: "#eff6ff", text: "#2563eb" },
  accepted: { bg: "#ecfdf5", text: "#059669" },
  declined: { bg: "#fef2f2", text: "#dc2626" },
  expired: { bg: "#fefce8", text: "#ca8a04" },
};

function QuotePdfDocument({
  quote,
  business,
  documentType = "development",
}: {
  quote: Quote;
  business: BusinessProfile;
  documentType?: "development" | "video";
}) {
  const currency = quote.currency;
  const isVideoEstimate = documentType === "video";
  const statusStyle = STATUS_COLORS[quote.status];

  const subtotal = getQuoteSubtotal(quote);
  const discount = getQuoteDiscount(quote);
  const tax = getQuoteTax(quote);
  const total = getQuoteTotal(quote);
  const deposit = getQuoteDeposit(quote);
  const balance = getQuoteBalance(quote);
  const lineItems = quote.lineItems.filter(
    (item) => item.description.trim() && item.quantity > 0
  );
  const scopeItems = lineItems.filter((item) => !item.id.endsWith("adjustment"));

  const contactLines = [
    business.businessEmail,
    business.businessPhone,
    business.businessAddress,
    business.businessWebsite,
    business.businessTaxId ? `VAT / Tax ID: ${business.businessTaxId}` : null,
  ].filter(Boolean);

  return (
    <Document
      title={quote.quoteNumber}
      author={business.businessName}
      subject={`${isVideoEstimate ? "Video editing" : "Development"} estimate — ${quote.title}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.topRule} />
        {/* ============ HEADER ============ */}
        <View style={styles.header}>
          <View style={styles.brandBlock}>
            <Text style={styles.brandName}>{business.businessName}</Text>
            <Text style={styles.brandTagline}>{business.businessTagline}</Text>
            <View style={{ marginTop: 8 }}>
              {contactLines.map((line) => (
                <Text key={line} style={styles.brandContact}>
                  {line}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.docMeta}>
            <Text style={styles.docLabel}>{isVideoEstimate ? "Video edit estimate" : "Development estimate"}</Text>
            <View style={{ marginTop: 10 }}>
              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Quote #</Text>
                <Text style={styles.metaValue}>{quote.quoteNumber}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Date</Text>
                <Text style={styles.metaValue}>{formatDate(quote.date)}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>Valid until</Text>
                <Text style={styles.metaValue}>
                  {formatDate(quote.validUntil)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ============ TITLE + STATUS ============ */}
        <View style={styles.titleBlock}>
          <Text style={styles.projectTitle}>{quote.title}</Text>
          <Text
            style={[
              styles.statusPill,
              { backgroundColor: statusStyle.bg, color: statusStyle.text },
            ]}
          >
            {quote.status}
          </Text>
        </View>

        {/* ============ PARTIES ============ */}
        <View style={styles.parties}>
          <View style={styles.partyBlock}>
            <Text style={styles.partyLabel}>From</Text>
            <Text style={styles.partyName}>{business.businessName}</Text>
            <Text style={styles.partyLine}>{business.businessAddress}</Text>
            <Text style={styles.partyLine}>{business.businessEmail}</Text>
            <Text style={styles.partyLine}>{business.businessPhone}</Text>
          </View>

          <View style={styles.partyBlock}>
            <Text style={styles.partyLabel}>Prepared for</Text>
            <Text style={styles.partyName}>
              {quote.client.company || quote.client.name}
            </Text>
            <Text style={styles.partyLine}>{quote.client.name}</Text>
            {quote.client.address && (
              <Text style={styles.partyLine}>{quote.client.address}</Text>
            )}
            {quote.client.email && (
              <Text style={styles.partyLine}>{quote.client.email}</Text>
            )}
            {quote.client.phone && (
              <Text style={styles.partyLine}>{quote.client.phone}</Text>
            )}
          </View>
        </View>

        {/* ============ LINE ITEMS TABLE ============ */}
        <View style={styles.tableWrap}>
          <View style={styles.tableHead}>
            <Text style={[styles.headCell, styles.colDescription]}>{isVideoEstimate ? "Editing service" : "Development service"}</Text>
            <Text style={[styles.headCell, styles.colDetails]}>Details</Text>
            <Text style={[styles.headCell, styles.colQty]}>Qty / Hrs</Text>
            <Text style={[styles.headCell, styles.colRate]}>Rate</Text>
            <Text style={[styles.headCell, styles.colAmount]}>Amount</Text>
          </View>

          {lineItems.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={[styles.cellStrong, styles.colDescription]}>
                {item.description}
              </Text>
              <Text style={[styles.cellMuted, styles.colDetails]}>
                {item.details || "—"}
              </Text>
              <Text style={[styles.cellText, styles.colQty]}>
                {item.quantity}
              </Text>
              <Text style={[styles.cellText, styles.colRate]}>
                {formatCurrency(item.rate, currency)}
              </Text>
              <Text style={[styles.cellStrong, styles.colAmount]}>
                {formatCurrency(item.quantity * item.rate, currency)}
              </Text>
            </View>
          ))}
        </View>

        {/* ============ TOTALS ============ */}
        <View style={styles.totals}>
          <View style={styles.totalsInner}>
            <View style={styles.totalRow}>
              <Text style={styles.totalKey}>Subtotal</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(subtotal, currency)}
              </Text>
            </View>

            {discount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalKey}>
                  Discount
                  {quote.discountType === "percent"
                    ? ` (${quote.discountValue}%)`
                    : ""}
                </Text>
                <Text style={styles.totalValue}>
                  − {formatCurrency(discount, currency)}
                </Text>
              </View>
            )}

            {quote.taxRate > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalKey}>
                  Tax ({quote.taxRate}%)
                </Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(tax, currency)}
                </Text>
              </View>
            )}

            <View style={styles.grandRow}>
              <Text style={styles.grandKey}>Total</Text>
              <Text style={styles.grandValue}>
                {formatCurrency(total, currency)}
              </Text>
            </View>

            {deposit > 0 && (
              <View style={styles.depositRow}>
                <View>
                  <Text style={styles.paymentLabel}>To begin</Text>
                  <Text style={styles.depositKey}>Deposit due ({quote.depositPercent}%)</Text>
                </View>
                <Text style={styles.depositValue}>{formatCurrency(deposit, currency)}</Text>
              </View>
            )}

            <View style={[styles.totalRow, { marginTop: 4 }]}>
              <Text style={{ fontSize: 8, color: slate.text, fontWeight: 500 }}>
                Balance due
              </Text>
              <Text style={{ fontSize: 8.5, color: slate.text, fontWeight: 700 }}>
                {formatCurrency(balance, currency)}
              </Text>
            </View>
          </View>
        </View>

        {scopeItems.length > 0 && (
          <View style={styles.scope}>
            <Text style={styles.notesLabel}>{isVideoEstimate ? "Editing scope & deliverables" : "Project scope & deliverables"}</Text>
            {scopeItems.map((item) => (
              <Text key={`scope-${item.id}`} style={styles.scopeItem}>
                • {item.description}
                {item.details ? ` — ${item.details}` : ""}
              </Text>
            ))}
          </View>
        )}

        {/* ============ NOTES / TERMS ============ */}
        {quote.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes & Terms</Text>
            <Text style={styles.notesText}>{quote.notes}</Text>
          </View>
        )}

        {/* ============ FOOTER ============ */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {business.businessName} · {business.businessWebsite}
          </Text>
          <Text style={styles.footerText}>
            Thank you for your business.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default QuotePdfDocument;
