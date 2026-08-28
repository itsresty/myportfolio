import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Play,
} from "lucide-react";

import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/projectcard";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const previewProjects = projects.slice(0, 5);

  const videos = previewProjects
    .filter(
      (project) =>
        project.category === "Video Editing" ||
        project.category === "Video" ||
        Boolean(project.video)
    )
    .filter((project) => Boolean(project.image))
    .map((project) => ({
      title: project.title,
      category: project.category,
      image: project.image as string,
      href: `/project/${project.slug}`,
    }));

  // A project belongs to one preview section only. This keeps the public
  // page at the promised five projects even when a web project has a video.
  const videoProjectSlugs = new Set(
    videos.map((video) => video.href.replace("/project/", ""))
  );

  const webProjects = previewProjects.filter(
    (project) =>
      !videoProjectSlugs.has(project.slug) &&
      (project.category === "Web Development" ||
        project.category === "Web App" ||
        project.category === "E-commerce")
  );

  const designProjects = previewProjects.filter(
    (project) =>
      !videoProjectSlugs.has(project.slug) &&
      (project.category === "UI/UX Design" ||
        project.category === "Web Design")
  );

  const otherProjects = previewProjects.filter(
    (project) =>
      !webProjects.some((item) => item.slug === project.slug) &&
      !designProjects.some((item) => item.slug === project.slug) &&
      !videos.some((item) => item.href === `/project/${project.slug}`)
  );

  return (
    <main className="mainpage w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-[100px] md:py-28">

        {/* =====================================================
            HERO
        ====================================================== */}

        <header className="border-b border-neutral-200 pb-16 md:pb-24">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">

            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Selected work
              </p>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] md:text-7xl lg:text-[88px]">
                Projects I&apos;ve
                <br />
                <span className="text-neutral-400">
                  built &amp; created.
                </span>
              </h1>
            </div>

            <p className="max-w-md text-sm leading-7 text-neutral-500 md:text-base">
              A collection of websites, digital experiences, visual designs,
              and creative content developed across different areas of my work.
            </p>

          </div>
        </header>


        {/* =====================================================
            WEB DEVELOPMENT
        ====================================================== */}

        {webProjects.length > 0 && (
          <section className="border-b border-neutral-200 py-20 md:py-28">

            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                  01 — Web Development
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Websites &amp;
                  <br />
                  <span className="text-neutral-400">
                    digital experiences.
                  </span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-neutral-500 md:text-right">
                Digital experiences built with responsive interfaces,
                thoughtful interactions, and practical functionality.
              </p>

            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {webProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>

          </section>
        )}


        {/* =====================================================
            VIDEO EDITING
        ====================================================== */}

        {videos.length > 0 && (
        <section className="border-b border-neutral-200 py-20 md:py-28">

          {/* Section Header */}

          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="mb-4 flex items-center gap-2">
                <Play
                  size={15}
                  strokeWidth={1.7}
                  className="text-neutral-400"
                />

                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                  02 — Video Editing
                </p>
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Editing stories
                <br />
                <span className="text-neutral-400">
                  frame by frame.
                </span>
              </h2>

            </div>

            <p className="max-w-sm text-sm leading-7 text-neutral-500 md:text-right">
              A visual collection of short-form edits, creative videos,
              motion experiments, and digital content.
            </p>

          </div>


          {/* =================================================
              VIDEO GALLERY
          ================================================== */}

          <div className="grid gap-4 md:grid-cols-2">

            {/* Featured Video */}

            <Link
              href={videos[0].href}
              className="group md:row-span-2"
            >
              <article>

                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">

                  <Image
                    src={videos[0].image}
                    alt={videos[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                  {/* Featured Label */}

                  <div className="absolute left-5 top-5 flex items-center gap-3">

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/20 text-[10px] font-medium text-white backdrop-blur-md">
                      01
                    </span>

                    <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
                      Featured
                    </span>

                  </div>


                  {/* Play Button */}

                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="flex h-16 w-16 translate-y-3 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                      <Play
                        size={19}
                        fill="currentColor"
                        strokeWidth={1.5}
                      />

                    </div>

                  </div>

                </div>


                <div className="mt-5 flex items-start justify-between gap-5">

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.12em] text-neutral-400">
                      {videos[0].category}
                    </p>

                    <h3 className="text-lg font-semibold tracking-[-0.02em]">
                      {videos[0].title}
                    </h3>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="mt-1 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
                  />

                </div>

              </article>
            </Link>


            {/* Smaller Videos */}

            <div className="grid gap-4 sm:grid-cols-2">

              {videos.slice(1, 3).map((video, index) => (
                <Link
                  href={video.href}
                  key={video.title}
                  className="group"
                >
                  <article>

                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">

                      <Image
                        src={video.image}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />

                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />

                      <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/20 text-[9px] text-white backdrop-blur-md">
                        0{index + 2}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100">

                          <Play
                            size={13}
                            fill="currentColor"
                          />

                        </div>

                      </div>

                    </div>

                    <div className="mt-3">

                      <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                        {video.category}
                      </p>

                      <h3 className="mt-1 text-sm font-medium">
                        {video.title}
                      </h3>

                    </div>

                  </article>
                </Link>
              ))}

            </div>


            {/* Bottom Videos */}

            {videos.slice(3).map((video, index) => (
              <Link
                href={video.href}
                key={video.title}
                className="group"
              >
                <article>

                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">

                    <Image
                      src={video.image}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />

                    <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/20 text-[9px] text-white backdrop-blur-md">
                      0{index + 4}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100">

                        <Play
                          size={13}
                          fill="currentColor"
                        />

                      </div>

                    </div>

                  </div>

                  <div className="mt-3">

                    <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                      {video.category}
                    </p>

                    <h3 className="mt-1 text-sm font-medium">
                      {video.title}
                    </h3>

                  </div>

                </article>
              </Link>
            ))}

          </div>


          {/* Gallery Footer */}

          <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-5">

            <p className="text-xs text-neutral-400">
              Selected video work
            </p>

            <span className="text-xs text-neutral-400">
              {videos.length} pieces
            </span>

          </div>

        </section>
        )}


        {/* =====================================================
            UI / UX DESIGN
        ====================================================== */}

        {designProjects.length > 0 && (
          <section className="border-b border-neutral-200 py-20 md:py-28">

            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                  03 — UI / UX Design
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                  Interfaces with
                  <br />
                  <span className="text-neutral-400">
                    intention.
                  </span>
                </h2>

              </div>

              <p className="max-w-sm text-sm leading-7 text-neutral-500 md:text-right">
                Interface concepts focused on hierarchy, usability, visual
                clarity, and thoughtful interaction.
              </p>

            </div>


            <div className="grid gap-8 md:grid-cols-2">

              {designProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}

            </div>

          </section>
        )}

        {otherProjects.length > 0 && (
          <section className="border-b border-neutral-200 py-20 md:py-28">
            <div className="mb-12">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">More work</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Other projects.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {otherProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </section>
        )}

        <section className="border-b border-neutral-200 py-20 md:py-28">
          <div className="flex flex-col gap-8 rounded-3xl bg-neutral-950 px-7 py-10 text-white md:flex-row md:items-end md:justify-between md:px-12 md:py-14">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">Full portfolio</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Explore all projects.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 md:text-base">Browse every website, design, video, and digital project in one place.</p>
            </div>
            <Link href="/project/all-projects" className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]">
              View all projects <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>


        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="pt-20 md:pt-28">

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <div>

              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Start something
              </p>

              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
                Have an idea?
                <br />
                <span className="text-neutral-400">
                  Let&apos;s make it real.
                </span>
              </h2>

            </div>


            <Link
              href="/contact"
              className="group flex h-16 w-fit items-center gap-4 rounded-full bg-black pl-6 pr-2 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
            >

              <span>
                Start a project
              </span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

              </span>

            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}
