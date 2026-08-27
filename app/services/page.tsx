import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  Film,
  Headset,
  Palette,
  PenTool,
  Settings2,
  Play,
} from "lucide-react";

import FAQ from "@/components/FAQs";
import HowIWork from "@/components/howiwork";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications designed around your goals, audience, and brand.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive Design",
      "API Integration",
      "Component Development",
      "SEO Fundamentals",
      "Performance Optimization",
    ],
  },
  {
    number: "02",
    icon: Headset,
    title: "Virtual Assistance",
    description:
      "Reliable digital support that helps you stay organized and gives you more time to focus on important work.",
    skills: [
      "Data Entry",
      "Web Research",
      "Email Assistance",
      "File Organization",
      "Spreadsheet Management",
      "Content Uploading",
      "Administrative Tasks",
      "Online Research",
      "Data Organization",
      "Website Management",
    ],
  },
  {
    number: "03",
    icon: Palette,
    title: "UI & Digital Design",
    description:
      "Clean interfaces that balance visual design, usability, consistency, and a strong digital presence.",
    skills: [
      "Website UI",
      "Landing Pages",
      "Portfolio Design",
      "Dashboard Design",
      "Responsive Layouts",
      "Design Systems",
      "UI Components",
      "Typography",
      "Layout & Spacing",
      "Visual Hierarchy",
    ],
  },
  {
    number: "04",
    icon: PenTool,
    title: "Digital Content",
    description:
      "Creative digital assets and content designed to help creators and businesses maintain a professional online presence.",
    skills: [
      "Social Media Graphics",
      "Digital Templates",
      "Presentation Design",
      "Content Formatting",
      "Digital Resources",
      "Creative Assets",
      "Content Organization",
      "Visual Content",
      "Document Formatting",
      "Content Planning",
    ],
  },
  {
    number: "05",
    icon: Settings2,
    title: "Website Maintenance",
    description:
      "Ongoing updates, improvements, fixes, and technical support for websites you already have.",
    skills: [
      "Content Updates",
      "Page Updates",
      "Bug Fixes",
      "Responsive Fixes",
      "Layout Improvements",
      "Component Updates",
      "Performance Improvements",
      "Image Optimization",
      "Technical Updates",
      "General Support",
    ],
  },
];

const videoServices = [
  "YouTube Videos",
  "YouTube Shorts",
  "TikTok & Reels",
  "Talking-Head Videos",
  "Captions & Subtitles",
  "B-Roll Editing",
  "Sound Design",
  "Transitions",
  "Basic Color Correction",
  "Social Media Formatting",
];

export default function ServicesPage() {
  return (
    <main className="mainpage">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="flex items-center gap-3">

            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />

            </span>

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
              Available for work
            </span>

          </div>


          <div className="mt-8 max-w-5xl">

            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              Services
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] md:text-7xl lg:text-[88px]">

              What can I help
              <br />

              <span className="text-neutral-400">
                you create?
              </span>

            </h1>


            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-500 md:text-lg">
              I combine development, design, video editing, and digital
              support to help individuals, creators, and businesses build
              better digital experiences.
            </p>

          </div>


          <div className="mt-10 flex flex-wrap gap-3">

            <Link
              href="/contact"
              className="group flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
            >

              Start a project

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>


            <Link
              href="/project"
              className="group flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-medium transition-colors hover:border-neutral-500 hover:bg-neutral-50"
            >

              View my work

              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT I CAN HELP WITH
      ====================================================== */}

      <section>

        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-[100px] md:py-32">

          <div className="mb-16 grid gap-8 md:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                What I can help with
              </p>

            </div>


            <div>

              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Digital skills for building, creating, and supporting your
                online presence.
              </h2>

            </div>

          </div>


          {/* =================================================
              WEB DEVELOPMENT
          ================================================== */}

          <article className="border-t border-neutral-200 py-16 md:py-24">

            <div className="grid gap-12 md:grid-cols-[0.75fr_1.25fr]">

              <div>

                <div className="flex items-center gap-4">

                  <span className="text-xs tracking-[0.15em] text-neutral-400">
                    01
                  </span>

                  <Code2
                    size={21}
                    strokeWidth={1.5}
                    className="text-neutral-500"
                  />

                </div>


                <h3 className="mt-7 text-4xl font-semibold tracking-[-0.04em]">
                  Web Development
                </h3>


                <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
                  {services[0].description}
                </p>


                <Link
                  href="/project"
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-medium"
                >

                  Explore my projects

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </Link>

              </div>


              <div>

                <p className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Skills & capabilities
                </p>


                <div className="grid border-t border-neutral-200 sm:grid-cols-2">

                  {services[0].skills.map((skill) => (

                    <div
                      key={skill}
                      className="flex items-center gap-3 border-b border-neutral-200 py-4 text-sm text-neutral-600 sm:even:border-l sm:even:pl-6"
                    >

                      <Check
                        size={15}
                        strokeWidth={1.8}
                        className="shrink-0 text-neutral-400"
                      />

                      {skill}

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </article>


          {/* =================================================
              VIDEO EDITING
          ================================================== */}

          <article className="border-t border-neutral-200 py-16 md:py-24">

            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <div className="flex items-center gap-4">

                  <span className="text-xs tracking-[0.15em] text-neutral-400">
                    02
                  </span>

                  <Film
                    size={21}
                    strokeWidth={1.5}
                    className="text-neutral-500"
                  />

                </div>


                <h3 className="mt-7 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  Video Editing
                </h3>

              </div>


              <p className="max-w-md text-sm leading-7 text-neutral-500 md:text-right">
                Professional editing for creators, businesses, YouTube,
                and social media.
              </p>

            </div>


            {/* Video Showcase */}

            <div className="relative overflow-hidden rounded-3xl bg-neutral-950">

              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />

                </div>


                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/40">

                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                  Featured Video

                </div>

              </div>


              <div className="relative aspect-video w-full">

                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="Video Editing Portfolio"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

              </div>


              <div className="flex flex-col justify-between gap-6 border-t border-white/10 p-6 md:flex-row md:items-center md:p-8">

                <div>

                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                    Featured Work
                  </p>

                  <h4 className="mt-2 text-xl font-medium">
                    Video Editing Portfolio
                  </h4>

                </div>


                <div className="flex items-center gap-2 text-sm text-white/40">

                  <Play
                    size={14}
                    strokeWidth={1.7}
                  />

                  Watch showcase

                </div>

              </div>

            </div>


            {/* Video Description */}

            <div className="mt-12 grid gap-12 md:grid-cols-[0.75fr_1.25fr]">

              <div>

                <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Editing approach
                </p>

                <h4 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                  Your footage.
                  <br />
                  Better story.
                </h4>

                <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
                  Good editing is more than cutting clips together. I focus on
                  pacing, storytelling, sound, and visual consistency to make
                  your content easier and more enjoyable to watch.
                </p>

              </div>


              <div>

                <p className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Skills & capabilities
                </p>


                <div className="grid border-t border-neutral-200 sm:grid-cols-2">

                  {videoServices.map((skill) => (

                    <div
                      key={skill}
                      className="flex items-center gap-3 border-b border-neutral-200 py-4 text-sm text-neutral-600 sm:even:border-l sm:even:pl-6"
                    >

                      <Check
                        size={15}
                        strokeWidth={1.8}
                        className="shrink-0 text-neutral-400"
                      />

                      {skill}

                    </div>

                  ))}

                </div>

              </div>

            </div>


            {/* Video CTA */}

            <div className="mt-12 flex flex-col justify-between gap-6 rounded-2xl bg-neutral-50 p-8 md:flex-row md:items-center md:p-10">

              <div>

                <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Have footage ready?
                </p>

                <h4 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                  Let&apos;s turn it into something worth watching.
                </h4>

              </div>


              <Link
                href="/contact"
                className="group flex w-fit shrink-0 items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
              >

                Discuss a video project

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>

            </div>

          </article>


          {/* =================================================
              OTHER SERVICES
          ================================================== */}

          <div className="grid border-t border-neutral-200 md:grid-cols-2">

            {services.slice(1).map((service) => {

              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="border-b border-neutral-200 py-12 md:px-10 md:py-16 md:odd:border-r"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-xs tracking-[0.15em] text-neutral-400">
                      {service.number}
                    </span>

                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className="text-neutral-500"
                    />

                  </div>


                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
                    {service.title}
                  </h3>


                  <p className="mt-4 text-sm leading-7 text-neutral-500">
                    {service.description}
                  </p>


                  <div className="mt-8">

                    <p className="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                      Skills & capabilities
                    </p>


                    <div className="grid gap-3">

                      {service.skills.map((skill) => (

                        <div
                          key={skill}
                          className="flex items-center gap-3 text-sm text-neutral-600"
                        >

                          <Check
                            size={14}
                            strokeWidth={1.8}
                            className="shrink-0 text-neutral-400"
                          />

                          {skill}

                        </div>

                      ))}

                    </div>

                  </div>

                </article>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW I WORK
      ====================================================== */}

      <HowIWork />


      {/* =====================================================
          FAQ
      ====================================================== */}

      <FAQ />


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="border-t border-neutral-200">

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-[100px] md:py-28">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                Have a project in mind?
              </p>

              <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Let&apos;s make something useful.
              </h2>

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