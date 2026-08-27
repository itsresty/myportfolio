"use client";

import { useEffect, useState } from "react";

type Analytics = { totalViews: number; activeVisitors: number };

export default function AdminLiveViews({ initial }: { initial: Analytics }) {
  const [analytics, setAnalytics] = useState(initial);

  useEffect(() => {
    const refresh = async () => {
      const response = await fetch("/api/admin/analytics", { cache: "no-store" });
      if (response.ok) setAnalytics(await response.json() as Analytics);
    };
    const interval = window.setInterval(() => void refresh(), 10_000);
    return () => window.clearInterval(interval);
  }, []);

  return <><span>{analytics.totalViews.toLocaleString()}</span><span className="ml-2 text-xs font-medium text-emerald-600">{analytics.activeVisitors} live</span></>;
}
