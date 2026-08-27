import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const recentProjects = [
  {
    title: "Dioness",
    description: "Modern fashion e-commerce experience.",
    image: "/projects/dioness.jpg",
    category: "Web Development",
    year: "2026",
  },
  {
    title: "Invoice Maker",
    description: "Simple and professional invoice management.",
    image: "/projects/invoice-maker.jpg",
    category: "Web App",
    year: "2026",
  },
];

export default function RecentProjects() {
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
            <Link
              key={project.title}
              href="/project"
              className="group"
            >
              <article>

                {/* Image */}
                <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-neutral-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                      Project Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.12em] text-neutral-400">
                      {project.category} · {project.year}
                    </p>

                    <h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-7 text-neutral-500">
                      {project.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.7}
                    />
                  </div>
                </div>

              </article>
            </Link>
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