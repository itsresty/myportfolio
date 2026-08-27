"use client";

import { useEffect } from "react";

export default function ScheduleCalendar() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <iframe
        src="https://cal.com/YOUR_USERNAME/30min"
        className="h-[700px] w-full border-0"
        title="Schedule a call"
      />
    </div>
  );
}