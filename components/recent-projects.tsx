import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/projectcard";
import { getAllProjects } from "@/lib/projects";

export default async function RecentProjects() {
  const projects = await getAllProjects();
  const recentProjects = projects
    .filter((project) => project.featured)
    .concat(projects.filter((project) => !project.featured))
    .slice(0, 2);

  if (recentProjects.length === 0) return null;
  return (
    <section className="w-full border-t border-neutral-200 py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              Selected work
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Recent projects
            </h2>
          </div>

          <Link
            href="/project"
            className="group hidden items-center gap-2 text-sm font-medium md:flex"
          >
            View all projects

            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Projects */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          {recentProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 md:hidden">
          <Link
            href="/project"
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            View all projects

            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
