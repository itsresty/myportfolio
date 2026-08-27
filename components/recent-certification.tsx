import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award } from "lucide-react";

import { certifications } from "@/lib/certifications";

export default function RecentCertifications() {
  const recentCertifications = [...certifications]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div className="max-w-2xl">

            <div className="flex items-center gap-3">
              <Award
                size={17}
                strokeWidth={1.6}
                className="text-neutral-500"
              />

              <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Certifications
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
              Learning that
              <br />
              <span className="text-neutral-400">
                keeps me moving forward.
              </span>
            </h2>

          </div>

          {/* View All */}

          <Link
            href="/certifications"
            className="group flex w-fit items-center gap-2 border-b border-black pb-1 text-sm font-medium"
          >
            View all certifications

            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

        </div>


        {/* =====================================================
            CERTIFICATION GRID
        ====================================================== */}

        {recentCertifications.length > 0 && (
          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {recentCertifications.map((certification, index) => (
              <a
                key={certification.id}
                href={certification.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >

                {/* Certificate Image */}

                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">

                  <Image
                    src={certification.image}
                    alt={certification.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />

                  {/* Number */}

                  <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm">
                    <span className="text-[10px] font-medium tracking-[0.1em] text-neutral-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Hover Action */}

                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                    View certificate

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.7}
                    />

                  </div>

                </div>


                {/* Information */}

                <div className="mt-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-sm font-semibold tracking-[-0.01em]">
                        {certification.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-neutral-500">
                        {certification.issuer}
                      </p>

                    </div>

                    <span className="shrink-0 text-xs text-neutral-400">
                      {certification.year}
                    </span>

                  </div>

                </div>

              </a>
            ))}

          </div>
        )}


        {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}

        <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-5">

          <p className="text-xs text-neutral-400">
            Selected certifications & professional learning
          </p>

          <span className="text-xs text-neutral-400">
            {certifications.length} total
          </span>

        </div>

      </div>
    </section>
  );
}