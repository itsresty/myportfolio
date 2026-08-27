import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="w-full border-t border-neutral-200">
      <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-10 px-6 py-20 md:px-[100px] md:py-28">

        {/* Text */}
        <div>
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Let&apos;s work together
          </p>

          <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Have an idea?
            <br />
            Let&apos;s make it happen.
          </h2>
        </div>


        {/* Contact Button */}
        <Link
          href="/contact"
          aria-label="Go to contact page"
          className="group flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:scale-105 md:h-20 md:w-20"
        >
          <ArrowUpRight
            size={26}
            strokeWidth={1.6}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>

      </div>
    </section>
  );
}