import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Web Development",
  "Video Editing",
  "Virtual Assistance",
  "UI & Digital Design",
  "Digital Content",
];

const socialLinks = [
  {
    href: "https://linkedin.com/",
    label: "LinkedIn",
  },
  {
    href: "https://instagram.com/",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-background">




      {/* =====================================================
          FOOTER CONTENT
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 md:px-[100px]">

          <div className="grid gap-14 py-16 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr] md:py-20">

            {/* =================================================
                BRAND
            ================================================== */}

            <div>

              <Link
                href="/"
                className="inline-block text-2xl font-bold tracking-[-0.04em]"
              >
                Your Name
              </Link>


              <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
                Web developer, video editor, and virtual assistant creating
                useful digital experiences and helping ideas move forward.
              </p>


              {/* Email */}

              <a
                href="mailto:hello@example.com"
                className="group mt-7 inline-flex items-center gap-3 text-sm font-medium"
              >

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:bg-neutral-100">
                  <Mail
                    size={15}
                    strokeWidth={1.7}
                  />
                </span>

                <span>
                  hello@example.com
                </span>

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.7}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </a>

            </div>


            {/* =================================================
                NAVIGATION
            ================================================== */}

            <div>

              <p className="mb-6 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                Explore
              </p>

              <nav className="flex flex-col gap-4">

                {navigation.map((item) => (

                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex w-fit items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-black"
                  >

                    <span>
                      {item.label}
                    </span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />

                  </Link>

                ))}

              </nav>

            </div>


            {/* =================================================
                SERVICES
            ================================================== */}

            <div>

              <p className="mb-6 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                Services
              </p>

              <div className="flex flex-col gap-4">

                {services.map((service) => (

                  <span
                    key={service}
                    className="text-sm text-neutral-600"
                  >
                    {service}
                  </span>

                ))}

              </div>

            </div>


            {/* =================================================
                CONNECT
            ================================================== */}

            <div>

              <p className="mb-6 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                Connect
              </p>


              <div className="flex flex-col gap-4">

                {socialLinks.map((social) => (

                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-black"
                  >

                    <span>
                      {social.label}
                    </span>

                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />

                  </a>

                ))}

              </div>


              {/* Location */}

              <div className="mt-8 flex items-start gap-3 text-sm text-neutral-500">

                <MapPin
                  size={15}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  Madrid, Spain
                  <br />
                  Available worldwide
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-[100px]">

          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>


          <div className="flex items-center gap-6">

            <Link
              href="/privacy"
              className="text-xs text-neutral-400 transition-colors hover:text-black"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-neutral-400 transition-colors hover:text-black"
            >
              Terms
            </Link>

            <span className="hidden h-3 w-px bg-neutral-200 sm:block" />

            <span className="text-xs text-neutral-400">
              Designed & built with care.
            </span>

          </div>

        </div>

      </section>

    </footer>
  );
}