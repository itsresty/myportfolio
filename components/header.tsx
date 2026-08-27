"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 md:px-6">
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            MAIN HEADER
        ====================================================== */}

        <div className="relative flex h-[68px] items-center justify-between rounded-2xl border border-neutral-200/80 bg-background/90 px-4 shadow-sm backdrop-blur-xl md:px-5">

          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >

            {/* RM Mark */}

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-xs font-bold tracking-[-0.04em] text-white transition-transform duration-300 group-hover:rotate-[-4deg]">
              RM
            </span>


            {/* Name */}

            <span className="hidden leading-none sm:block">

              <span className="block text-sm font-semibold tracking-[-0.02em]">
                Resty Montero
              </span>

              <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Digital Creator
              </span>

            </span>

          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">

            {navLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-3.5 py-2 text-[13px] font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-black"
              >

                {link.label}

                {/* Hover indicator */}

                <span className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-black transition-all duration-300 group-hover:w-3" />

              </Link>

            ))}

          </nav>


          {/* =================================================
              DESKTOP CONTACT
          ================================================== */}

          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-black py-2.5 pl-4 pr-2.5 text-xs font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-800 md:flex"
          >

            <span>
              Let&apos;s talk
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">

              <ArrowUpRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </span>

          </Link>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:bg-neutral-100 md:hidden"
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

          <div className="mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-background/95 shadow-lg backdrop-blur-xl md:hidden">

            <nav className="p-3">

              {navLinks.map((link, index) => (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-4 py-4 transition-colors hover:bg-neutral-100"
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
                    className="text-neutral-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                  />

                </Link>

              ))}


              {/* Mobile CTA */}

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="group mt-2 flex items-center justify-between rounded-xl bg-black px-4 py-4 text-sm font-medium text-white"
              >

                <span>
                  Let&apos;s work together
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />

                </span>

              </Link>

            </nav>


            {/* Mobile Footer */}

            <div className="border-t border-neutral-200 px-5 py-4">

              <div className="flex items-center justify-between">

                <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                  Resty Montero
                </span>

                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-neutral-400">

                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  Available for work

                </span>

              </div>

            </div>

          </div>

        )}

      </div>
    </header>
  );
}