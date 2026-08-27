"use client";

import { useMemo, useState } from "react";
import {
  Download,
  GripVertical,
  Plus,
  Trash2,
  UserRound,
  Calculator,
} from "lucide-react";

import type { Quote, QuoteLineItem } from "@/lib/quote-utils";
import {
  CURRENCIES,
  formatCurrency,
  getQuoteBalance,
  getQuoteDeposit,
  getQuoteDiscount,
  getQuoteSubtotal,
  getQuoteTax,
  getQuoteTaxable,
  getQuoteTotal,
} from "@/lib/quote-utils";

const SERVICE_PRESETS = [
  { id: "full-stack", group: "Development", label: "Full-stack development", rate: 3600 },
  { id: "frontend", group: "Development", label: "Frontend development", rate: 1800 },
  { id: "backend", group: "Development", label: "Backend development", rate: 2100 },
  { id: "uiux", group: "Development", label: "UI/UX design", rate: 1100 },
  { id: "maintenance", group: "Development", label: "Maintenance retainer", rate: 500 },
  { id: "video", group: "Video editing", label: "Video editing", rate: 600 },
];

const FEATURE_PRESETS = [
  { id: "responsive-design", group: "Frontend", label: "Responsive design", rate: 220 },
  { id: "mobile-optimization", group: "Frontend", label: "Mobile optimization", rate: 150 },
  { id: "tablet-optimization", group: "Frontend", label: "Tablet optimization", rate: 100 },
  { id: "desktop-optimization", group: "Frontend", label: "Desktop optimization", rate: 80 },
  { id: "navigation-system", group: "Frontend", label: "Navigation system", rate: 150 },
  { id: "authentication-pages", group: "Frontend", label: "Authentication pages", rate: 250 },
  { id: "user-registration", group: "Frontend", label: "User registration", rate: 200 },
  { id: "login-system", group: "Frontend", label: "Login system", rate: 170 },
  { id: "forgot-password", group: "Frontend", label: "Forgot-password flow", rate: 120 },
  { id: "user-profile", group: "Frontend", label: "User profile", rate: 260 },
  { id: "user-dashboard", group: "Frontend", label: "User dashboard", rate: 600 },
  { id: "admin-dashboard", group: "Frontend", label: "Admin dashboard", rate: 800 },
  { id: "search-system", group: "Frontend", label: "Search system", rate: 180 },
  { id: "advanced-filters", group: "Frontend", label: "Advanced filters", rate: 250 },
  { id: "pagination", group: "Frontend", label: "Pagination", rate: 100 },
  { id: "dark-mode", group: "Frontend", label: "Dark mode", rate: 150 },
  { id: "multi-language", group: "Frontend", label: "Multi-language support", rate: 400 },
  { id: "accessibility", group: "Frontend", label: "Accessibility features", rate: 300 },
  { id: "custom-animations", group: "Frontend", label: "Custom animations", rate: 320 },
  { id: "interactive-components", group: "Frontend", label: "Interactive components", rate: 300 },
  { id: "data-visualization", group: "Frontend", label: "Data visualization", rate: 400 },
  { id: "frontend-api-integration", group: "Frontend", label: "API integration", rate: 350 },
  { id: "commerce", group: "Frontend", label: "E-commerce and payments", rate: 850 },
  { id: "api", group: "Backend", label: "API integration", rate: 450 },
  { id: "database", group: "Backend", label: "Database design and implementation", rate: 650 },
  { id: "uploads", group: "Backend", label: "File and image upload", rate: 220 },
  { id: "realtime", group: "Backend", label: "Real-time notifications", rate: 550 },
  { id: "research", group: "UI/UX", label: "UX research and user flows", rate: 400 },
  { id: "design-system", group: "UI/UX", label: "Design system and component library", rate: 650 },
  { id: "prototype", group: "UI/UX", label: "Interactive prototype", rate: 300 },
  { id: "captions", group: "Video", label: "Captions and animated subtitles", rate: 120 },
  { id: "motion", group: "Video", label: "Motion graphics and animated text", rate: 300 },
  { id: "grading", group: "Video", label: "Color grading and audio cleanup", rate: 200 },
];

const DEVELOPMENT_PROJECT_TYPES = [
  "Landing page", "Portfolio", "Business website", "E-commerce", "Marketplace",
  "Booking system", "SaaS platform", "Mobile application", "Dashboard", "Custom web app",
];

const VIDEO_PROJECT_TYPES = [
  "Short-form social video", "YouTube video", "Advertisement", "Podcast / interview",
  "Educational video", "Documentary", "Product demo",
];

const COMPLEXITY = {
  basic: { label: "Basic", multiplier: 1 },
  standard: { label: "Standard", multiplier: 1.1 },
  advanced: { label: "Advanced", multiplier: 1.25 },
  enterprise: { label: "Enterprise", multiplier: 1.5 },
} as const;

const RUSH_DELIVERY = {
  normal: { label: "Normal", percentage: 0 },
  priority: { label: "Priority (+15%)", percentage: 15 },
  rush: { label: "Rush (+30%)", percentage: 30 },
  emergency: { label: "Emergency (+50%)", percentage: 50 },
} as const;

const DATABASE_TIERS = [
  { id: "basic", label: "Basic database — up to 5 tables", rate: 350 },
  { id: "standard", label: "Standard database — 6–15 tables", rate: 700 },
  { id: "advanced", label: "Advanced database — 16–30 tables", rate: 1300 },
  { id: "enterprise", label: "Enterprise database — 30+ tables", rate: 2400 },
];

const VIDEO_TYPES = [
  { id: "short", label: "Short-form video / Reel / TikTok", rate: 300 },
  { id: "long", label: "YouTube long-form video", rate: 850 },
  { id: "commercial", label: "Advertisement / promotional video", rate: 1500 },
  { id: "podcast", label: "Podcast / interview edit", rate: 900 },
  { id: "documentary", label: "Documentary / educational video", rate: 1800 },
];

const VIDEO_LENGTHS = [
  { id: "under-30", label: "Under 30 seconds", rate: 0 },
  { id: "30-60", label: "30–60 seconds", rate: 30 },
  { id: "1-5", label: "1–5 minutes", rate: 75 },
  { id: "5-10", label: "5–10 minutes", rate: 150 },
  { id: "10-30", label: "10–30 minutes", rate: 280 },
  { id: "30-plus", label: "More than 30 minutes", rate: 450 },
];

const RAW_FOOTAGE = [
  { id: "under-30", label: "Under 30 minutes", rate: 0 },
  { id: "30-60", label: "30–60 minutes", rate: 30 },
  { id: "1-2", label: "1–2 hours", rate: 75 },
  { id: "2-5", label: "2–5 hours", rate: 170 },
  { id: "5-10", label: "5–10 hours", rate: 300 },
  { id: "10-plus", label: "More than 10 hours", rate: 500 },
];

const ADDITIONAL_FEES = [
  { id: "hosting", label: "Hosting and deployment", rate: 100 },
  { id: "domain", label: "Domain and DNS setup", rate: 40 },
  { id: "third-party", label: "Third-party software / API usage", rate: 200 },
  { id: "assets", label: "Premium assets, fonts or stock media", rate: 150 },
  { id: "weekend", label: "Weekend work", rate: 250 },
  { id: "scope-change", label: "Initial scope-change allowance", rate: 350 },
];

type ComplexityLevel = keyof typeof COMPLEXITY;
type RushDelivery = keyof typeof RUSH_DELIVERY;
type EstimateOption = { id: string; label: string; rate: number };
type EstimateService = "development" | "video";
const VIDEO_FEE_IDS = ["assets", "weekend"];

function isVideoLineItem(item: QuoteLineItem) {
  return item.id === "preset-video" || item.id.startsWith("option-video-") || item.id.startsWith("option-raw-footage-") || ["preset-captions", "preset-motion", "preset-grading"].includes(item.id) || VIDEO_FEE_IDS.some((id) => item.id === `preset-fee-${id}`) || /video|reel|tiktok|podcast|footage|captions|motion graphics|color grading|stock media|premium assets|weekend work/i.test(item.description);
}

function newLineItem(): QuoteLineItem {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now() + Math.random()),
    description: "",
    details: "",
    quantity: 1,
    rate: 0,
  };
}

function emptyQuote(): Quote {
  return {
    slug: "",
    quoteNumber: `ESTIMATE-${new Date().getFullYear()}-${String(
      new Date().getTime()
    ).slice(-4)}`,
    title: "",
    status: "draft",
    date: new Date().toISOString().slice(0, 10),
    validUntil: "",
    currency: "USD",
    taxRate: 0,
    discountType: "percent",
    discountValue: 0,
    depositPercent: 0,
    lineItems: [newLineItem()],
    notes: "",
    client: {
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
    },
  };
}

export default function CostEstimator({
  defaultService = "development",
}: {
  defaultService?: EstimateService;
}) {
  const [data, setData] = useState<Quote>(emptyQuote());
  const [downloading, setDownloading] = useState(false);
  const [projectType, setProjectType] = useState(
    defaultService === "video" ? VIDEO_PROJECT_TYPES[0] : DEVELOPMENT_PROJECT_TYPES[0]
  );
  const [complexity, setComplexity] = useState<ComplexityLevel>("standard");
  const [rushDelivery, setRushDelivery] = useState<RushDelivery>("normal");
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [extraDays, setExtraDays] = useState(3);
  const [includedRevisions, setIncludedRevisions] = useState(2);
  const [paymentPlan, setPaymentPlan] = useState("50/50");
  const [pricingMethod, setPricingMethod] = useState("Fixed price");
  const [estimateService, setEstimateService] = useState<EstimateService>(defaultService);
  const isVideoCalculator = estimateService === "video";
  const projectTypes = isVideoCalculator ? VIDEO_PROJECT_TYPES : DEVELOPMENT_PROJECT_TYPES;

  const validLineItems = data.lineItems.filter(
    (item) => item.description.trim() && item.quantity > 0
  );

  const baseSubtotal = getQuoteSubtotal(data);
  const selectedScopeItems = data.lineItems.filter(
    (item) => item.id.startsWith("preset-") || item.id.startsWith("option-")
  );
  const selectedScopeTotal = getQuoteSubtotal({ lineItems: selectedScopeItems });
  const manualServicesTotal = baseSubtotal - selectedScopeTotal;
  const complexityAmount = baseSubtotal * (COMPLEXITY[complexity].multiplier - 1);
  const rushAmount = (baseSubtotal + complexityAmount) * (RUSH_DELIVERY[rushDelivery].percentage / 100);

  const calculatedQuote = useMemo(() => {
    const adjustments: QuoteLineItem[] = [
      ...(complexityAmount > 0 ? [{ id: "complexity-adjustment", description: `${COMPLEXITY[complexity].label} complexity adjustment`, quantity: 1, rate: complexityAmount }] : []),
      ...(rushAmount > 0 ? [{ id: "rush-adjustment", description: `${RUSH_DELIVERY[rushDelivery].label} delivery adjustment`, quantity: 1, rate: rushAmount }] : []),
    ];

    return { ...data, lineItems: [...data.lineItems, ...adjustments] };
  }, [complexity, complexityAmount, data, rushAmount, rushDelivery]);

  const subtotal = getQuoteSubtotal(calculatedQuote);
  const discount = getQuoteDiscount(calculatedQuote);
  const taxable = getQuoteTaxable(calculatedQuote);
  const tax = getQuoteTax(calculatedQuote);
  const total = getQuoteTotal(calculatedQuote);
  const deposit = getQuoteDeposit(calculatedQuote);
  const balance = getQuoteBalance(calculatedQuote);
  const estimatedHours = Math.max(1, Math.ceil(subtotal / (isVideoCalculator ? 35 : 45)));
  const estimatedDays = Math.ceil(estimatedHours / Math.max(hoursPerDay, 1)) + extraDays;
  const quoteForDownload = useMemo<Quote>(() => ({
    ...calculatedQuote,
    notes: [
      calculatedQuote.notes?.trim(),
      `Project type: ${projectType}.`,
      `Pricing method: ${pricingMethod}.`,
      `Payment plan: ${paymentPlan}.`,
      `Included revisions: ${includedRevisions === 99 ? "Unlimited" : includedRevisions}.`,
      `Requested services: ${calculatedQuote.lineItems.filter((item) => !item.id.endsWith("adjustment") && item.description.trim()).map((item) => item.description).join(", ")}.`,
      "Work begins after the required deposit is received. Scope changes, additional revisions, and third-party services may require an additional quotation.",
    ].filter(Boolean).join("\n\n"),
  }), [calculatedQuote, includedRevisions, paymentPlan, pricingMethod, projectType]);

  function updateField<K extends keyof Quote>(key: K, value: Quote[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function selectEstimateService(service: EstimateService) {
    setEstimateService(service);
    setProjectType(service === "video" ? VIDEO_PROJECT_TYPES[0] : DEVELOPMENT_PROJECT_TYPES[0]);
    setData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) =>
        !item.description.trim() || isVideoLineItem(item) === (service === "video")
      ),
    }));
  }

  function updateClientField<K extends keyof Quote["client"]>(
    key: K,
    value: Quote["client"][K]
  ) {
    setData((prev) => ({
      ...prev,
      client: { ...prev.client, [key]: value },
    }));
  }

  function updateLineItem(
    id: string,
    field: keyof QuoteLineItem,
    value: string | number
  ) {
    setData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addLineItem() {
    setData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, newLineItem()],
    }));
  }

  function removeLineItem(id: string) {
    setData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id),
    }));
  }

  function togglePreset(preset: { id: string; label: string; rate: number }) {
    const id = `preset-${preset.id}`;

    setData((prev) => {
      const exists = prev.lineItems.some((item) => item.id === id);

      return {
        ...prev,
        lineItems: exists
          ? prev.lineItems.filter((item) => item.id !== id)
          : [...prev.lineItems, { id, description: preset.label, details: "Selected from estimator catalog", quantity: 1, rate: preset.rate }],
      };
    });
  }

  function isPresetSelected(id: string) {
    return data.lineItems.some((item) => item.id === `preset-${id}`);
  }

  function selectOption(category: string, option: EstimateOption | undefined) {
    setData((prev) => ({
      ...prev,
      lineItems: [
        ...prev.lineItems.filter((item) =>
          !item.id.startsWith(`option-${category}-`) &&
          !(category === "video" && (item.id.startsWith("option-video-length-") || item.id.startsWith("option-raw-footage-")))
        ),
        ...(option ? [{ id: `option-${category}-${option.id}`, description: option.label, details: "Selected from estimator scope", quantity: 1, rate: option.rate }] : []),
      ],
    }));
  }

  function selectedOption(category: string) {
    return data.lineItems.find((item) => item.id.startsWith(`option-${category}-`))?.id.replace(`option-${category}-`, "") ?? "";
  }

  async function handleDownload() {
    const serviceLineItems = data.lineItems.filter((item) =>
      estimateService === "video" ? isVideoLineItem(item) : !isVideoLineItem(item)
    );

    if (!serviceLineItems.some((item) => item.description.trim() && item.quantity > 0)) {
      alert(`Add at least one ${estimateService === "video" ? "video editing" : "development"} service before downloading this PDF.`);
      return;
    }

    const serviceSubtotal = getQuoteSubtotal({ lineItems: serviceLineItems });
    const serviceComplexityAmount = serviceSubtotal * (COMPLEXITY[complexity].multiplier - 1);
    const serviceRushAmount = (serviceSubtotal + serviceComplexityAmount) * (RUSH_DELIVERY[rushDelivery].percentage / 100);
    const serviceAdjustments: QuoteLineItem[] = [
      ...(serviceComplexityAmount > 0 ? [{ id: "complexity-adjustment", description: `${COMPLEXITY[complexity].label} complexity adjustment`, quantity: 1, rate: serviceComplexityAmount }] : []),
      ...(serviceRushAmount > 0 ? [{ id: "rush-adjustment", description: `${RUSH_DELIVERY[rushDelivery].label} delivery adjustment`, quantity: 1, rate: serviceRushAmount }] : []),
    ];
    const serviceName = estimateService === "video" ? "video editing" : "development";
    const serviceQuote = {
      ...quoteForDownload,
      lineItems: [...serviceLineItems, ...serviceAdjustments],
      notes: quoteForDownload.notes?.replace(
        /Requested services: .*?\./,
        `Requested ${serviceName} services: ${serviceLineItems.map((item) => item.description).join(", ")}.`
      ),
    };

    if (!data.title.trim()) {
      alert("Add a project title before downloading the PDF.");
      return;
    }

    if (!data.client.name.trim()) {
      alert("Add the client name before downloading the PDF.");
      return;
    }

    setDownloading(true);

    try {
      const response = await fetch("/api/quotes/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: serviceQuote,
          documentType: estimateService,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Could not generate the PDF.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.quoteNumber || "estimate"}-${new Date().toISOString().replace(/[:.]/g, "-")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Could not generate the PDF.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* =================================================
          LEFT — MAIN
      ================================================== */}
      <div className="space-y-6">
        {/* Project details */}
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Calculator size={15} />
            </span>
            <h2 className="font-bold text-slate-950">Project</h2>
          </div>

          <label className="block text-sm font-semibold text-slate-900">
            Project title
            <input
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. E-commerce website build"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-base font-normal outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/5"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Estimate service
              <select value={estimateService} onChange={(event) => selectEstimateService(event.target.value as EstimateService)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-950">
                <option value="development">Development</option>
                <option value="video">Video editing</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Estimate number
              <input
                value={data.quoteNumber}
                onChange={(e) => updateField("quoteNumber", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Currency
              <select
                value={data.currency}
                onChange={(e) => updateField("currency", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Date
              <input
                type="date"
                value={data.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Valid until
              <input
                type="date"
                value={data.validUntil ?? ""}
                onChange={(e) => updateField("validUntil", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>

          </div>
        </section>

        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div>
            <h2 className="font-bold text-slate-950">Project brief</h2>
            <p className="mt-1 text-sm text-slate-500">Add the client’s requested outcome, objectives, and any special deliverables.</p>
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Scope summary & project objectives
            <textarea
              value={data.notes ?? ""}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="For example: Build a responsive e-commerce website with a product catalog, secure checkout, client dashboard, and launch support."
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm leading-6 outline-none transition focus:border-slate-950"
            />
          </label>
        </section>

        {/* Client */}
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <UserRound size={15} />
            </span>
            <h2 className="font-bold text-slate-950">Client</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Client name
              <input
                value={data.client.name}
                onChange={(e) => updateClientField("name", e.target.value)}
                placeholder="e.g. John Doe"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Company
              <input
                value={data.client.company ?? ""}
                onChange={(e) => updateClientField("company", e.target.value)}
                placeholder="e.g. Acme Inc."
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                value={data.client.email ?? ""}
                onChange={(e) => updateClientField("email", e.target.value)}
                placeholder="client@email.com"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Phone
              <input
                value={data.client.phone ?? ""}
                onChange={(e) => updateClientField("phone", e.target.value)}
                placeholder="+34 600 000 000"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Billing address
              <input
                value={data.client.address ?? ""}
                onChange={(e) => updateClientField("address", e.target.value)}
                placeholder="Street, city, postal code, country"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>
          </div>
        </section>

        {/* Services */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <GripVertical size={15} />
              </span>
              <h2 className="font-bold text-slate-950">Services</h2>
            </div>

            <button
              type="button"
              onClick={addLineItem}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
            >
              <Plus size={15} />
              Add service
            </button>
          </div>

          <div className="mb-2 hidden grid-cols-[1fr_1.2fr_80px_110px_110px_36px] gap-3 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:grid">
            <span>Service</span>
            <span>Details</span>
            <span className="text-right">Qty / Hrs</span>
            <span className="text-right">Rate</span>
            <span className="text-right">Amount</span>
            <span />
          </div>

          <div className="space-y-3">
            {data.lineItems.map((item, index) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-3"
              >
                <div className="mb-3 flex items-center justify-between sm:hidden">
                  <span className="text-xs font-semibold text-slate-400">
                    Service #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLineItem(item.id)}
                    className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-rose-500"
                    aria-label={`Remove service ${index + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-[1fr_1.2fr_80px_110px_110px_36px] sm:items-center">
                  <input
                    value={item.description}
                    onChange={(e) =>
                      updateLineItem(item.id, "description", e.target.value)
                    }
                    placeholder="e.g. Frontend development"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-950"
                  />

                  <input
                    value={item.details ?? ""}
                    onChange={(e) =>
                      updateLineItem(item.id, "details", e.target.value)
                    }
                    placeholder="e.g. Home, shop, 5 pages"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-950"
                  />

                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={item.quantity}
                    onChange={(e) =>
                      updateLineItem(item.id, "quantity", Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-right text-sm outline-none transition focus:border-slate-950"
                  />

                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={item.rate}
                    onChange={(e) =>
                      updateLineItem(item.id, "rate", Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-right text-sm outline-none transition focus:border-slate-950"
                  />

                  <p className="text-right text-sm font-semibold text-slate-900 sm:pr-1">
                    {formatCurrency(item.quantity * item.rate, data.currency)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeLineItem(item.id)}
                    className="hidden h-9 w-9 items-center justify-center justify-self-end rounded-lg text-slate-400 transition hover:bg-white hover:text-rose-500 hover:shadow-sm sm:flex"
                    aria-label={`Remove service ${index + 1}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {data.lineItems.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-center">
              <Plus size={20} className="text-slate-300" />
              <p className="mt-3 text-sm font-medium text-slate-500">
                No services yet
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Add your first line item to start building the estimate.
              </p>
            </div>
          )}
        </section>

        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div>
            <h2 className="font-bold text-slate-950">{isVideoCalculator ? "Video editing calculator" : "Development calculator"}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {isVideoCalculator ? "Build an estimate from editing format, runtime, footage volume, and post-production options." : "Build an estimate from development services, features, and technical scope."}
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-950">
            <span className="mt-0.5 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Starter pricing</span>
            <p>Global-market baseline prices, based on mid-level freelance project ranges. Every line item remains editable for the final scope and client region.</p>
          </div>
          <div aria-live="polite" className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <span className="font-medium text-slate-700">Selected {isVideoCalculator ? "editing services" : "development services"}</span>
            <span className="font-bold text-slate-950">{selectedScopeItems.length} · {formatCurrency(selectedScopeTotal, data.currency)}</span>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            {isVideoCalculator ? "Video type" : "Project type"}
            <select
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
            >
              {projectTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>

          {[(isVideoCalculator ? "Video editing" : "Development")].map((group) => (
            <div key={group}>
              <h3 className="mb-3 text-sm font-semibold text-slate-800">{group} services</h3>
              <div className="flex flex-wrap gap-2">
                {SERVICE_PRESETS.filter((preset) => preset.group === group).map((preset) => {
                  const selected = isPresetSelected(preset.id);
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => togglePreset(preset)}
                      className={`rounded-xl border px-3 py-2 text-left text-sm transition ${selected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
                    >
                      <span className="block font-medium">{preset.label}</span>
                      <span className={`text-xs ${selected ? "text-slate-300" : "text-slate-400"}`}>{formatCurrency(preset.rate, data.currency)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!isVideoCalculator && <div className="border-t border-slate-100 pt-6">
            <h3 className="mb-4 text-base font-bold text-slate-950">Development scope</h3>
          {["Frontend", "Backend", "UI/UX"].map((group) => (
            <div key={group}>
              <h3 className="mb-3 text-sm font-semibold text-slate-800">{group} features</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {FEATURE_PRESETS.filter((preset) => preset.group === group).map((preset) => {
                  const selected = isPresetSelected(preset.id);
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => togglePreset(preset)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
                    >
                      <span>{preset.label}</span>
                      <span className={`ml-3 shrink-0 text-xs font-semibold ${selected ? "text-slate-300" : "text-slate-400"}`}>{formatCurrency(preset.rate, data.currency)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="mt-6 max-w-xl">
            <label className="block text-sm font-medium text-slate-700">
              Database complexity
              <select
                value={selectedOption("database")}
                onChange={(event) => selectOption("database", DATABASE_TIERS.find((tier) => tier.id === event.target.value))}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950"
              >
                <option value="">No database work</option>
                {DATABASE_TIERS.map((tier) => <option key={tier.id} value={tier.id}>{tier.label} — {formatCurrency(tier.rate, data.currency)}</option>)}
              </select>
            </label>
          </div>
          </div>}

          {isVideoCalculator && <div className="border-t border-slate-100 pt-6">
            <h3 className="mb-2 text-base font-bold text-slate-950">Video editing scope</h3>
            <p className="mb-4 text-sm text-slate-500">Choose an edit type, then select the final video and raw-footage lengths.</p>
            <div className="max-w-xl">
            <label className="block text-sm font-medium text-slate-700">
              Video production type
              <select
                value={selectedOption("video")}
                onChange={(event) => selectOption("video", VIDEO_TYPES.find((type) => type.id === event.target.value))}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950"
              >
                <option value="">No video production</option>
                {VIDEO_TYPES.map((type) => <option key={type.id} value={type.id}>{type.label} — {formatCurrency(type.rate, data.currency)}</option>)}
              </select>
            </label>
            </div>

            <div className="mt-5">
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Video editing features</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {FEATURE_PRESETS.filter((preset) => preset.group === "Video").map((preset) => {
                  const selected = isPresetSelected(preset.id);
                  return (
                    <button key={preset.id} type="button" aria-pressed={selected} onClick={() => togglePreset(preset)} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                      <span>{preset.label}</span>
                      <span className={`ml-3 shrink-0 text-xs font-semibold ${selected ? "text-slate-300" : "text-slate-400"}`}>{formatCurrency(preset.rate, data.currency)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>}

          {isVideoCalculator && selectedOption("video") && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Final video length
                <select value={selectedOption("video-length")} onChange={(event) => selectOption("video-length", VIDEO_LENGTHS.find((length) => length.id === event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950">
                  <option value="">Select duration</option>
                  {VIDEO_LENGTHS.map((length) => <option key={length.id} value={length.id}>{length.label}{length.rate ? ` — +${formatCurrency(length.rate, data.currency)}` : ""}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Raw footage length
                <select value={selectedOption("raw-footage")} onChange={(event) => selectOption("raw-footage", RAW_FOOTAGE.find((footage) => footage.id === event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950">
                  <option value="">Select footage volume</option>
                  {RAW_FOOTAGE.map((footage) => <option key={footage.id} value={footage.id}>{footage.label}{footage.rate ? ` — +${formatCurrency(footage.rate, data.currency)}` : ""}</option>)}
                </select>
              </label>
            </div>
          )}

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Additional project fees</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {ADDITIONAL_FEES.filter((fee) => isVideoCalculator ? VIDEO_FEE_IDS.includes(fee.id) : !VIDEO_FEE_IDS.includes(fee.id)).map((fee) => {
                const selected = isPresetSelected(`fee-${fee.id}`);
                return (
                  <button
                    key={fee.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => togglePreset({ ...fee, id: `fee-${fee.id}` })}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
                  >
                    <span>{fee.label}</span><span className={`ml-3 shrink-0 text-xs font-semibold ${selected ? "text-slate-300" : "text-slate-400"}`}>+{formatCurrency(fee.rate, data.currency)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div>
            <h2 className="font-bold text-slate-950">Delivery, revisions & payment plan</h2>
            <p className="mt-1 text-sm text-slate-500">These settings calculate delivery effort and document the commercial terms.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block text-sm font-medium text-slate-700">
              Pricing method
              <select value={pricingMethod} onChange={(event) => setPricingMethod(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950">
                <option>Fixed price</option><option>Hourly pricing</option><option>Daily rate</option><option>Milestone pricing</option><option>Monthly retainer</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Complexity
              <select value={complexity} onChange={(event) => setComplexity(event.target.value as ComplexityLevel)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950">
                {Object.entries(COMPLEXITY).map(([key, value]) => <option key={key} value={key}>{value.label} ×{value.multiplier}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Delivery speed
              <select value={rushDelivery} onChange={(event) => setRushDelivery(event.target.value as RushDelivery)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950">
                {Object.entries(RUSH_DELIVERY).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Included revisions
              <select value={includedRevisions} onChange={(event) => setIncludedRevisions(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950">
                {[1, 2, 3, 99].map((value) => <option key={value} value={value}>{value === 99 ? "Unlimited" : `${value} revision${value > 1 ? "s" : ""}`}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Working hours / day
              <input type="number" min={1} max={24} value={hoursPerDay} onChange={(event) => setHoursPerDay(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              {isVideoCalculator ? "Review & export days" : "Feedback & contingency days"}
              <input type="number" min={0} value={extraDays} onChange={(event) => setExtraDays(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Payment structure
              <select value={paymentPlan} onChange={(event) => setPaymentPlan(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-950">
                <option>50/50</option><option>40/40/20</option><option>30/20/25/15/10 milestones</option><option>Monthly retainer</option>
              </select>
            </label>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-950">Timeline estimate: </span>
            about {estimatedHours} working hours / {estimatedDays} working days for {isVideoCalculator ? `a ${projectType.toLowerCase()} edit` : `a ${projectType.toLowerCase()} project`}. Includes {includedRevisions === 99 ? "unlimited revisions" : `${includedRevisions} included revision${includedRevisions === 1 ? "" : "s"}`} and the {paymentPlan} payment structure.
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-950">Payment schedule</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {paymentPlan === "50/50" && <><span>1. Deposit before work starts</span><span className="font-medium sm:text-right">50%</span><span>2. Final delivery payment</span><span className="font-medium sm:text-right">50%</span></>}
              {paymentPlan === "40/40/20" && <><span>1. Deposit</span><span className="font-medium sm:text-right">40%</span><span>2. During development</span><span className="font-medium sm:text-right">40%</span><span>3. Final delivery</span><span className="font-medium sm:text-right">20%</span></>}
              {paymentPlan === "30/20/25/15/10 milestones" && <><span>Deposit / planning / development</span><span className="font-medium sm:text-right">30% / 20% / 25%</span><span>Testing / final delivery</span><span className="font-medium sm:text-right">15% / 10%</span></>}
              {paymentPlan === "Monthly retainer" && <><span>Monthly service fee</span><span className="font-medium sm:text-right">{formatCurrency(total, data.currency)} / month</span><span>Includes</span><span className="font-medium sm:text-right">Maintenance, updates & support</span></>}
            </div>
          </div>
        </section>
      </div>

      {/* =================================================
          RIGHT — SIDEBAR
      ================================================== */}
      <aside className="space-y-6">
        {/* Pricing */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-950">Pricing</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Tax, discount, and deposit applied to this estimate.
            </p>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Tax rate (%)
            <input
              type="number"
              min={0}
              step={0.01}
              value={data.taxRate}
              onChange={(e) => updateField("taxRate", Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-slate-700">
              Discount type
              <select
                value={data.discountType}
                onChange={(e) =>
                  updateField("discountType", e.target.value as "percent" | "fixed")
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              >
                <option value="percent">Percent</option>
                <option value="fixed">Fixed</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              {data.discountType === "percent" ? "% off" : "Amount off"}
              <input
                type="number"
                min={0}
                step={0.01}
                value={data.discountValue}
                onChange={(e) => updateField("discountValue", Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Deposit due (%)
            <input
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={data.depositPercent}
              onChange={(e) => updateField("depositPercent", Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
            />
          </label>
        </section>

        {/* Totals */}
        <section className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
            Estimate
          </h2>

          <div className="space-y-2.5">
            {manualServicesTotal > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Manual services</span>
                <span className="font-medium">{formatCurrency(manualServicesTotal, data.currency)}</span>
              </div>
            )}
            {selectedScopeItems.length > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Selected scope ({selectedScopeItems.length})</span>
                <span className="font-medium">{formatCurrency(selectedScopeTotal, data.currency)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Base services</span>
              <span className="font-medium">
                {formatCurrency(baseSubtotal, data.currency)}
              </span>
            </div>

            {complexityAmount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  {COMPLEXITY[complexity].label} complexity
                </span>
                <span className="font-medium">
                  + {formatCurrency(complexityAmount, data.currency)}
                </span>
              </div>
            )}

            {rushAmount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{RUSH_DELIVERY[rushDelivery].label}</span>
                <span className="font-medium">
                  + {formatCurrency(rushAmount, data.currency)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {validLineItems.length}{" "}
                {validLineItems.length === 1 ? "service" : "services"}
              </span>
              <span className="text-slate-400">All selected costs included</span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Discount</span>
                <span className="font-medium">
                  − {formatCurrency(discount, data.currency)}
                </span>
              </div>
            )}

            {data.taxRate > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Tax ({data.taxRate}%)</span>
                <span className="font-medium">
                  {taxable > 0 ? formatCurrency(tax, data.currency) : "—"}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-base font-bold">Total</span>
              <span className="text-xl font-bold tracking-tight">
                {formatCurrency(total, data.currency)}
              </span>
            </div>

            {deposit > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                <span className="text-xs font-medium text-slate-300">
                  Deposit ({data.depositPercent}%)
                </span>
                <span className="text-sm font-bold">
                  {formatCurrency(deposit, data.currency)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">Balance due</span>
              <span className="text-sm font-semibold text-slate-300">
                {formatCurrency(balance, data.currency)}
              </span>
            </div>
          </div>
        </section>

        {/* Download */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={17} />
            {downloading ? "Generating…" : `Download ${estimateService === "video" ? "video editing" : "development"} PDF`}
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-slate-400">
            Generates a dedicated PDF with only the selected service category.
          </p>
        </section>
      </aside>
    </div>
  );
}
