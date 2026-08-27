"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const VISITOR_KEY = "portfolio-visitor-id";

function getVisitorId() {
  const stored = window.localStorage.getItem(VISITOR_KEY);
  if (stored) return stored;
  const id = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_KEY, id);
  return id;
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const visitorId = getVisitorId();
    const send = (event: "view" | "heartbeat") => {
      void fetch("/api/analytics/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, pathname, event }),
        keepalive: true,
      });
    };

    send("view");
    const heartbeat = window.setInterval(() => send("heartbeat"), 30_000);
    return () => window.clearInterval(heartbeat);
  }, [pathname]);

  return null;
}
