"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function AdminThemeToggle({ collapsed = false }: { collapsed?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      title="Toggle admin light and dark mode"
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white ${collapsed ? "w-full justify-center" : "w-full"}`}
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="block dark:hidden" />
      {!collapsed && <span>Theme</span>}
    </button>
  );
}
