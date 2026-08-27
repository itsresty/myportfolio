"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PageViewTracker from "@/components/page-view-tracker";
import ThemeProvider from "@/components/theme-provider";

export default function SiteChromeClient({
  availableForWork,
  children,
}: {
  availableForWork: boolean;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="portfolio-theme">
      <div className="portfolio-shell">
        <PageViewTracker />
        <Header availableForWork={availableForWork} />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
