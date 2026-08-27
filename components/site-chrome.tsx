import type { ReactNode } from "react";
import SiteChromeClient from "@/components/site-chrome-client";
import { getSiteSettings } from "@/lib/site-settings";

export default async function SiteChrome({ children }: { children: ReactNode }) {
  const { availableForWork } = await getSiteSettings();

  return (
    <SiteChromeClient availableForWork={availableForWork}>
      {children}
    </SiteChromeClient>
  );
}
