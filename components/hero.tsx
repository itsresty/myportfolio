"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Film,
  Headphones,
  MapPin,
} from "lucide-react";

import Availability from "@/components/availability";

const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Websites & applications",
    icon: Code2,
  },
  {
    number: "02",
    title: "Video Editing",
    description: "YouTube & social content",
    icon: Film,
  },
  {
    number: "03",
    title: "Virtual Assistance",
    description: "Digital support",
    icon: Headphones,
  },
];

export default function Hero({ availableForWork = true }: { availableForWork?: boolean }) {
  return (
    <section className="relative w-full overflow-hidden">

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-20 h-[420px] w-[420px] rounded-full border border-neutral-200/60" />

        <div className="absolute -right-10 top-40 h-[280px] w-[280px] rounded-full border border-neutral-200/50" />
      </div>


      {/* SAME WIDTH AS HEADER */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-[100px]">

        {/* =====================================================
            MAIN HERO
        ====================================================== */}

        <div className="grid min-h-[calc(100vh-80px)] items-center gap-10 py-10 md:py-12 lg:grid-cols-[1fr_300px]">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div>

            {/* Availability */}

            <Availability available={availableForWork} />


            {/* Intro */}

            <div className="mt-7 flex items-center gap-3">

              <span className="h-px w-7 bg-black" />

              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">
                Hello, I&apos;m Resty Montero
              </p>

            </div>


            {/* Heading */}

            <h1 className="mt-5 max-w-4xl text-[clamp(3.2rem,6.5vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-black">

              I build digital
              <br />

              <span className="text-neutral-400">
                experiences.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">

              I create modern websites, engaging video content, and
              practical digital solutions for individuals, creators,
              and businesses.

            </p>


            {/* CTA */}

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/project"
                className="group flex items-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >

                View my work

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />

                </span>

              </Link>


              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-black transition hover:border-black hover:bg-neutral-50"
              >

                Let&apos;s talk

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

              </Link>

            </div>

          </div>


          {/* =================================================
              RIGHT VISUAL
          ================================================== */}

          <div className="hidden lg:flex lg:justify-end">

            <div className="relative h-[280px] w-[280px]">

              {/* Outer circle */}

              <div className="absolute inset-0 rounded-full border border-neutral-200" />


              {/* Middle circle */}

              <div className="absolute inset-[12%] rounded-full border border-neutral-200" />


              {/* RM */}

              <div className="absolute inset-[25%] flex items-center justify-center rounded-full bg-neutral-50">

                <span className="text-6xl font-semibold tracking-[-0.08em] text-neutral-300">
                  RM
                </span>

              </div>


              {/* Location */}

              <div className="absolute -bottom-2 left-0 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 shadow-sm">

                <MapPin
                  size={13}
                  strokeWidth={1.6}
                  className="text-neutral-500"
                />

                <span className="text-[11px] font-medium text-neutral-600">
                  Madrid, Spain
                </span>

              </div>


              {/* Year */}

              <div className="absolute right-0 top-3 rounded-full border border-neutral-200 bg-white px-3 py-2 shadow-sm">

                <span className="text-[11px] font-medium text-neutral-500">
                  2026
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            SERVICES
        ====================================================== */}

        <div className="border-t border-neutral-200">

          <div className="grid md:grid-cols-3">

            {services.map((service, index) => {

              const Icon = service.icon;

              return (
                <Link
                  key={service.number}
                  href="/services"
                  className={`group flex items-center gap-4 py-5 transition-colors hover:bg-neutral-50 md:px-5 ${
                    index > 0
                      ? "border-t border-neutral-200 md:border-l md:border-t-0"
                      : ""
                  }`}
                >

                  {/* Number */}

                  <span className="self-start pt-1 text-[10px] font-medium tracking-[0.15em] text-neutral-400">
                    {service.number}
                  </span>


                  {/* Icon */}

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 group-hover:border-black group-hover:bg-black">

                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-neutral-600 transition-colors group-hover:text-white"
                    />

                  </div>


                  {/* Text */}

                  <div className="min-w-0">

                    <h2 className="truncate text-sm font-semibold text-black">
                      {service.title}
                    </h2>

                    <p className="mt-0.5 truncate text-xs text-neutral-500">
                      {service.description}
                    </p>

                  </div>


                  {/* Arrow */}

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.6}
                    className="ml-auto shrink-0 text-neutral-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                  />

                </Link>
              );
            })}

          </div>

        </div>


        {/* =====================================================
            SMALL FOOTER META
        ====================================================== */}

        <div className="flex items-center justify-between border-t border-neutral-200 py-4">

          <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-neutral-400">
            Freelance & remote work
          </p>

          <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-neutral-400">
            Web · Video · Support
          </p>

        </div>

      </div>

    </section>
  );
}
