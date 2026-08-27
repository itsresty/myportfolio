
import type { Metadata } from "next";
import "./globals.css";

import SiteChrome from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Resty Montero | Software Developer",
  description:
    "Personal portfolio of Resty Montero — software developer, designer, and digital creator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <SiteChrome>
          <main className="flex-1">{children}</main>
        </SiteChrome>
      </body>
    </html>
  );
}
