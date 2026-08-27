import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mainpage">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-[100px] md:py-24">

        {/* Back */}
        <Link
          href="/project"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />

          Back to projects
        </Link>

        {/* Header */}
        <header className="max-w-5xl">
          <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-9 text-neutral-500">
            {project.description}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative mt-16 aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-100">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Details */}
        <section className="mt-16 grid gap-12 border-b border-neutral-200 pb-16 md:grid-cols-[1fr_280px]">

          {/* Description */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              About the project
            </p>

            <p className="max-w-3xl text-lg leading-8 text-neutral-600">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Project Info */}
          <div className="space-y-8">

            <div>
              <p className="mb-2 text-sm text-neutral-500">
                Year
              </p>

              <p className="font-medium">
                {project.year}
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm text-neutral-500">
                Technologies
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-600"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {project.liveUrl && project.liveUrl !== "#" && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                Visit project

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            )}

          </div>
        </section>

      </div>
    </main>
  );
}