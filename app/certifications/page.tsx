import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
} from "lucide-react";

import { certifications } from "@/lib/certifications";

export default function CertificationsPage() {
  const sortedCertifications = [...certifications].sort(
    (a, b) => b.year - a.year
  );

  const latestYear =
    certifications.length > 0
      ? Math.max(...certifications.map((cert) => cert.year))
      : "—";

  return (
    <main className="mainpage w-full">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-neutral-200">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

          {/* Back */}

          <Link
            href="/about"
            className="group mb-12 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to About
          </Link>


          {/* Label */}

          <div className="flex items-center gap-3">

            <Award
              size={18}
              strokeWidth={1.6}
              className="text-neutral-500"
            />

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              Certifications
            </p>

          </div>


          {/* Heading */}

          <div className="mt-7 max-w-5xl">

            <h1 className="text-5xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-7xl lg:text-[88px]">
              Always learning.
              <br />

              <span className="text-neutral-400">
                Always improving.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-500 md:text-lg">
              A collection of certifications and professional learning
              experiences that represent my continued growth in technology,
              development, design, and digital work.
            </p>

          </div>


          {/* Stats */}

          <div className="mt-14 grid border-y border-neutral-200 sm:grid-cols-3">

            {/* Total */}

            <div className="border-b border-neutral-200 py-6 sm:border-b-0 sm:border-r sm:pr-8">

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Certifications
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {certifications.length}
              </p>

            </div>


            {/* Latest */}

            <div className="border-b border-neutral-200 py-6 sm:border-b-0 sm:border-r sm:px-8">

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Latest year
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {latestYear}
              </p>

            </div>


            {/* Focus */}

            <div className="py-6 sm:pl-8">

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Focus
              </p>

              <p className="mt-2 text-sm font-medium">
                Digital & Technology
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CERTIFICATIONS
      ====================================================== */}

      <section>

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

          {/* Heading */}

          <div className="mb-12">

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              My credentials
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Certifications & learning
            </h2>

          </div>


          {/* Empty State */}

          {sortedCertifications.length === 0 ? (

            <div className="border-y border-neutral-200 py-16">

              <p className="text-sm text-neutral-500">
                Certifications will be added here soon.
              </p>

            </div>

          ) : (

            /* Certification Grid */

            <div className="grid gap-10 md:grid-cols-2">

              {sortedCertifications.map((certification, index) => (

                <article
                  key={certification.id}
                  className="group"
                >

                  {/* Image / PDF Link */}

                  <a
                    href={certification.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >

                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">

                      <Image
                        src={certification.image}
                        alt={certification.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />


                      {/* Number */}

                      <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm">

                        <span className="text-[10px] font-medium tracking-[0.1em] text-neutral-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                      </div>


                      {/* View PDF */}

                      <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                        View certificate

                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.7}
                        />

                      </div>

                    </div>

                  </a>


                  {/* Information */}

                  <div className="mt-5">

                    <div className="flex items-start justify-between gap-5">

                      <div>

                        <h3 className="text-lg font-semibold tracking-[-0.02em]">
                          {certification.title}
                        </h3>

                        <p className="mt-1.5 text-sm text-neutral-500">
                          {certification.issuer}
                        </p>

                      </div>


                      <span className="shrink-0 text-xs text-neutral-400">
                        {certification.year}
                      </span>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          CONTINUOUS LEARNING
      ====================================================== */}

      <section className="border-t border-neutral-200 bg-neutral-50">

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">

            {/* Left */}

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Continuous learning
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Skills go beyond certificates.
              </h2>

            </div>


            {/* Right */}

            <div className="max-w-2xl">

              <p className="text-base leading-8 text-neutral-500">
                Certifications are only one part of my learning journey.
                I also learn through personal projects, experimenting with
                new technologies, building websites, creating digital
                content, and solving practical problems.
              </p>

              <p className="mt-6 text-base leading-8 text-neutral-500">
                My goal is not simply to collect certificates. I want to
                turn what I learn into practical skills that can create
                useful and effective digital experiences.
              </p>


              <Link
                href="/project"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
              >

                See what I&apos;ve built

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                Let&apos;s work together
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Have a project in mind?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500">
                Looking for someone to build, create, or help with your
                next digital project? Let&apos;s talk.
              </p>

            </div>


            <Link
              href="/contact"
              aria-label="Contact me"
              className="group flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:scale-105"
            >

              <ArrowUpRight
                size={24}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}