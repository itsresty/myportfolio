export type QuoteLineItem = {
  id: string;
  description: string;
  details?: string;
  quantity: number;
  rate: number;
};

export type QuoteStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "declined"
  | "expired";

export type QuoteClient = {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export type Quote = {
  slug: string;
  quoteNumber: string;
  title: string;
  status: QuoteStatus;
  date: string;
  validUntil?: string;
  currency: string;
  taxRate: number;
  discountType: "percent" | "fixed";
  discountValue: number;
  depositPercent: number;
  lineItems: QuoteLineItem[];
  notes?: string;
  client: QuoteClient;
};

export type QuoteInput = Omit<Quote, "slug"> & {
  slug?: string;
};

export const CURRENCIES = [
  { code: "EUR", label: "EUR — Euro" },
  { code: "USD", label: "USD — US Dollar" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "COP", label: "COP — Colombian Peso" },
  { code: "ARS", label: "ARS — Argentine Peso" },
  { code: "MXN", label: "MXN — Mexican Peso" },
  { code: "CLP", label: "CLP — Chilean Peso" },
  { code: "PEN", label: "PEN — Peruvian Sol" },
];

export function getQuoteSubtotal(quote: Pick<Quote, "lineItems">): number {
  return quote.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
}

export function getQuoteDiscount(quote: Quote): number {
  const subtotal = getQuoteSubtotal(quote);

  return quote.discountType === "percent"
    ? (subtotal * quote.discountValue) / 100
    : Math.min(quote.discountValue, subtotal);
}

export function getQuoteTaxable(quote: Quote): number {
  return getQuoteSubtotal(quote) - getQuoteDiscount(quote);
}

export function getQuoteTax(quote: Quote): number {
  return (getQuoteTaxable(quote) * quote.taxRate) / 100;
}

export function getQuoteTotal(quote: Quote): number {
  return getQuoteTaxable(quote) + getQuoteTax(quote);
}

export function getQuoteDeposit(quote: Quote): number {
  return quote.depositPercent
    ? (getQuoteTotal(quote) * quote.depositPercent) / 100
    : 0;
}

export function getQuoteBalance(quote: Quote): number {
  return getQuoteTotal(quote) - getQuoteDeposit(quote);
}

export function formatCurrency(amount: number, currency = "EUR"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export function formatDate(date?: string): string {
  if (!date) return "—";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}
