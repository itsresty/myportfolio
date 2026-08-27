"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Calculator,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import AdminThemeToggle from "@/components/admin-theme-toggle";

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open admin navigation"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm lg:hidden"
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close admin navigation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white p-4 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-[84px]" : "w-64"}`}
      >
        <div className="mb-9 flex items-center justify-between px-1">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden" onClick={() => setIsOpen(false)}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-bold tracking-tight text-white">RM</span>
            {!isCollapsed && <span className="whitespace-nowrap text-sm font-bold tracking-tight text-slate-950">Admin Studio</span>}
          </Link>
          <button type="button" aria-label="Close navigation" onClick={() => setIsOpen(false)} className="text-slate-500 lg:hidden"><X size={20} /></button>
        </div>

        <nav className="space-y-1">
          {!isCollapsed && <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>}
          {navigation.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                title={isCollapsed ? label : undefined}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1 border-t border-slate-100 pt-4">
          <AdminThemeToggle collapsed={isCollapsed} />
          <Link href="/" title={isCollapsed ? "View portfolio" : undefined} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-950">
            <UserRound size={18} className="shrink-0" /> {!isCollapsed && <span>View portfolio</span>}
          </Link>
          <Link href="/admin/cost-estimator" title={isCollapsed ? "Cost Estimator" : undefined} onClick={() => setIsOpen(false)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${pathname.startsWith("/admin/cost-estimator") ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"}`}>
            <Calculator size={18} className="shrink-0" /> {!isCollapsed && <span>Cost Estimator</span>}
          </Link>
          <Link href="/admin/settings" title={isCollapsed ? "Settings" : undefined} onClick={() => setIsOpen(false)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${pathname.startsWith("/admin/settings") ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"}`}>
            <Settings size={18} className="shrink-0" /> {!isCollapsed && <span>Settings</span>}
          </Link>
          <form action={logoutAction}>
            <button type="submit" title={isCollapsed ? "Sign out" : undefined} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50">
              <LogOut size={18} className="shrink-0" /> {!isCollapsed && <span>Sign out</span>}
            </button>
          </form>
          <button type="button" aria-label="Toggle sidebar" onClick={() => setIsCollapsed(!isCollapsed)} className="mt-2 hidden w-full items-center justify-center rounded-xl py-2 text-slate-400 hover:bg-slate-100 hover:text-slate-950 lg:flex">
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>
    </>
  );
}
