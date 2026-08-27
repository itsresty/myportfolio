"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";
import AdminToast from "@/components/admin-toast";
import ThemeProvider from "@/components/theme-provider";

export default function AdminShell({ children }: { children: ReactNode }) {
  const isLoginPage = usePathname() === "/admin/login";

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange storageKey="admin-theme">
      {isLoginPage ? children : (
        <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-background dark:text-foreground lg:pl-64">
          <AdminSidebar />
          <Suspense fallback={null}>
            <AdminToast />
          </Suspense>
          <main className="min-h-screen">{children}</main>
        </div>
      )}
    </ThemeProvider>
  );
}
