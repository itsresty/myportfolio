import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/projectcard";

export const dynamic = "force-dynamic";

export default async function AllProjectsPage() {
  const projects = await getAllProjects();
  return (
    <main className="mainpage">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-[100px] md:py-24">
        <Link href="/project" className="text-sm font-medium text-neutral-500 hover:text-black">← Back to projects</Link>
        <header className="mb-12 mt-8 border-b border-neutral-200 pb-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Selected work</p><h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">All projects</h1></header>
        {projects.length ? <div className="grid gap-8 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <p className="text-neutral-500">No projects yet.</p>}
      </div>
    </main>
  );
}
