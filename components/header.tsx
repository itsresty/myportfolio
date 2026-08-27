"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import LetsTalk from "@/components/ui/lets-talk-btn";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ availableForWork = true }: { availableForWork?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const themeButton = (
    <button
      type="button"
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
    >
      <Sun size={17} strokeWidth={1.8} className="hidden dark:block" />
      <Moon size={17} strokeWidth={1.8} className="block dark:hidden" />
    </button>
  );

  return (
    <>
    <header className="sticky top-0 z-50 w-full px-4 pt-4 md:px-6">
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            MAIN HEADER
        ====================================================== */}

        <div className="relative flex h-[68px] items-center justify-between rounded-2xl border border-neutral-200/80 bg-background/90 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 md:px-5">

          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center"
          >
            <h1 className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-xs font-bold tracking-[-0.04em] text-white transition-transform duration-300 group-hover:rotate-[-4deg] dark:bg-white dark:text-black">
              RM
            </h1>
          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-3.5 py-2 text-[18px] font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.label}

                {/* Hover indicator */}

                <span className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-black transition-all duration-300 group-hover:w-3 dark:bg-white" />
              </Link>
            ))}

          </nav>


          {/* =================================================
              DESKTOP LET'S TALK
          ================================================== */}

          <div className="hidden items-center gap-2 md:flex">
            {themeButton}
            <LetsTalk />
          </div>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-white/10 md:hidden"
          >
            {menuOpen ? (
              <X
                size={19}
                strokeWidth={1.7}
              />
            ) : (
              <Menu
                size={19}
                strokeWidth={1.7}
              />
            )}
          </button>

        </div>


        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        {menuOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-background/95 shadow-lg backdrop-blur-xl dark:border-white/10 md:hidden">

            <nav className="p-3">

              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-4 py-4 transition-colors hover:bg-neutral-100 dark:hover:bg-white/10"
                >

                  <div className="flex items-center gap-4">

                    <span className="text-[10px] font-medium tracking-[0.15em] text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-medium">
                      {link.label}
                    </span>

                  </div>

                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.7}
                    className="text-neutral-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white"
                  />

                </Link>
              ))}


              {/* =================================================
                  MOBILE LET'S TALK
              ================================================== */}

              <div className="mt-2">
                <LetsTalk
                  mobile
                  label="Let's work together"
                />
              </div>

            </nav>


            {/* =================================================
                MOBILE FOOTER
            ================================================== */}

            <div className="border-t border-neutral-200 px-5 py-4 dark:border-white/10">

              <div className="flex items-center justify-between">

                <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                  Resty Montero
                </span>

                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-neutral-400">

                    <span className={`h-1.5 w-1.5 rounded-full ${availableForWork ? "bg-green-500" : "bg-neutral-400"}`} />

                  {availableForWork ? "Available for work" : "Unavailable"}

                </span>

              </div>

            </div>

          </div>
        )}

      </div>
    </header>

    <button
      type="button"
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-lg transition-colors hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-white/10 md:hidden"
    >
      <Sun size={19} strokeWidth={1.8} className="hidden dark:block" />
      <Moon size={19} strokeWidth={1.8} className="block dark:hidden" />
    </button>
    </>
  );
}
