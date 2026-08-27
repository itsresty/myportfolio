import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  year: string;
};

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className="group block"
    >
      <article>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h2 className="mt-2 text-2xl font-semibold">
            {project.title}
          </h2>

          <p className="mt-2 leading-7 text-neutral-500">
            {project.description}
          </p>
        </div>
      </article>
    </Link>
  );
}