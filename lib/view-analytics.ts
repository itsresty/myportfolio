import "server-only";

import fs from "fs";
import path from "path";

type ActiveVisitor = { lastSeen: number; path: string };
type StoredAnalytics = {
  totalViews: number;
  pages: Record<string, number>;
  visitors: Record<string, ActiveVisitor>;
};

export type ViewAnalytics = {
  totalViews: number;
  activeVisitors: number;
  topPages: Array<{ path: string; views: number }>;
};

const ANALYTICS_FILE = path.join(process.cwd(), "content", "view-analytics.json");
const ACTIVE_WINDOW_MS = 90_000;
const emptyAnalytics = (): StoredAnalytics => ({ totalViews: 0, pages: {}, visitors: {} });

function readAnalytics(): StoredAnalytics {
  if (!fs.existsSync(ANALYTICS_FILE)) return emptyAnalytics();
  try {
    const parsed = JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf8")) as Partial<StoredAnalytics>;
    return {
      totalViews: Number.isFinite(parsed.totalViews) ? parsed.totalViews! : 0,
      pages: parsed.pages ?? {},
      visitors: parsed.visitors ?? {},
    };
  } catch {
    return emptyAnalytics();
  }
}

function writeAnalytics(analytics: StoredAnalytics) {
  fs.mkdirSync(path.dirname(ANALYTICS_FILE), { recursive: true });
  fs.writeFileSync(ANALYTICS_FILE, `${JSON.stringify(analytics, null, 2)}\n`, "utf8");
}

function cleanPath(pathname: string) {
  return pathname.startsWith("/") && pathname.length <= 160 ? pathname : "/";
}

function cleanVisitorId(visitorId: string) {
  return /^[a-zA-Z0-9-]{12,80}$/.test(visitorId) ? visitorId : null;
}

export function recordPageView(visitorId: string, pathname: string) {
  const id = cleanVisitorId(visitorId);
  if (!id) return getViewAnalytics();

  const analytics = readAnalytics();
  const now = Date.now();
  const page = cleanPath(pathname);
  analytics.totalViews += 1;
  analytics.pages[page] = (analytics.pages[page] ?? 0) + 1;
  analytics.visitors[id] = { lastSeen: now, path: page };

  for (const [key, visitor] of Object.entries(analytics.visitors)) {
    if (!visitor || now - visitor.lastSeen > ACTIVE_WINDOW_MS) delete analytics.visitors[key];
  }

  writeAnalytics(analytics);
  return getViewAnalyticsFrom(analytics, now);
}

export function touchVisitor(visitorId: string, pathname: string) {
  const id = cleanVisitorId(visitorId);
  if (!id) return getViewAnalytics();

  const analytics = readAnalytics();
  analytics.visitors[id] = { lastSeen: Date.now(), path: cleanPath(pathname) };
  writeAnalytics(analytics);
  return getViewAnalyticsFrom(analytics, Date.now());
}

function getViewAnalyticsFrom(analytics: StoredAnalytics, now: number): ViewAnalytics {
  return {
    totalViews: analytics.totalViews,
    activeVisitors: Object.values(analytics.visitors).filter((visitor) => now - visitor.lastSeen <= ACTIVE_WINDOW_MS).length,
    topPages: Object.entries(analytics.pages)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5),
  };
}

export function getViewAnalytics() {
  return getViewAnalyticsFrom(readAnalytics(), Date.now());
}
