import "server-only";

import fs from "fs";
import path from "path";

import type { Quote, QuoteInput } from "@/lib/quote-utils";

export type {
  Quote,
  QuoteClient,
  QuoteInput,
  QuoteLineItem,
  QuoteStatus,
} from "@/lib/quote-utils";

const QUOTES_FILE = path.join(
  process.cwd(),
  "content",
  "quotes.json"
);

/* =========================================================
   FILE HELPERS
========================================================= */

function readQuotes(): Quote[] {
  if (!fs.existsSync(QUOTES_FILE)) {
    return [];
  }

  try {
    return JSON.parse(
      fs.readFileSync(QUOTES_FILE, "utf8")
    ) as Quote[];
  } catch {
    return [];
  }
}

function writeQuotes(quotes: Quote[]) {
  fs.mkdirSync(
    path.dirname(QUOTES_FILE),
    { recursive: true }
  );

  fs.writeFileSync(
    QUOTES_FILE,
    `${JSON.stringify(quotes, null, 2)}\n`,
    "utf8"
  );
}

/* =========================================================
   SLUG
========================================================= */

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/* =========================================================
   QUOTE NUMBER
========================================================= */

export function generateQuoteNumber(): string {
  const year = new Date().getFullYear();
  const count = readQuotes().length + 1;

  return `Q-${year}-${String(count).padStart(3, "0")}`;
}

/* =========================================================
   CALCULATIONS
========================================================= */

/* =========================================================
   CRUD
========================================================= */

export function getAllQuotes(): Quote[] {
  return readQuotes().sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}

export function getQuoteBySlug(
  slug: string
): Quote | undefined {
  return readQuotes().find(
    (quote) => quote.slug === slug
  );
}

export function createQuote(
  input: QuoteInput
): string {
  const quotes = readQuotes();

  const slug = makeSlug(
    input.slug || input.quoteNumber
  );

  if (!slug) {
    throw new Error(
      "Quote number is required."
    );
  }

  if (
    quotes.some(
      (quote) => quote.slug === slug
    )
  ) {
    throw new Error(
      "A quote with this number already exists."
    );
  }

  quotes.unshift({
    ...input,
    slug,
  });

  writeQuotes(quotes);

  return slug;
}

export function updateQuote(
  oldSlug: string,
  input: QuoteInput
): string {
  const quotes = readQuotes();

  const index = quotes.findIndex(
    (quote) => quote.slug === oldSlug
  );

  if (index < 0) {
    throw new Error(
      "Quote not found."
    );
  }

  const slug = makeSlug(
    input.slug || input.quoteNumber
  );

  if (!slug) {
    throw new Error(
      "Quote number is required."
    );
  }

  if (
    slug !== oldSlug &&
    quotes.some(
      (quote) => quote.slug === slug
    )
  ) {
    throw new Error(
      "A quote with this number already exists."
    );
  }

  quotes[index] = {
    ...input,
    slug,
  };

  writeQuotes(quotes);

  return slug;
}

export function deleteQuote(
  slug: string
) {
  const quotes = readQuotes();

  const next = quotes.filter(
    (quote) => quote.slug !== slug
  );

  if (next.length === quotes.length) {
    throw new Error(
      "Quote not found."
    );
  }

  writeQuotes(next);
}
