import type { ReactNode } from "react";
import SiteChromeClient from "@/components/site-chrome-client";
import { getSiteSettings } from "@/lib/site-settings";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const { availableForWork } = getSiteSettings();

  return (
    <SiteChromeClient availableForWork={availableForWork}>
      {children}
    </SiteChromeClient>
  );
}
