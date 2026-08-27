
import Link from "next/link";
import {
  ExternalLink,
  Pencil,
  Plus,
  FolderKanban,
  ChevronRight,
  Star,
  Trash2,
} from "lucide-react";

import { requireAdmin } from "@/lib/admin-auth";
import { getAllProjects } from "@/lib/projects";
import { deleteProjectAction } from "@/app/admin/actions";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    deleted?: string;
  }>;
}) {
  await requireAdmin();

  const projects = await getAllProjects();
  const { deleted } = await searchParams;

  const featuredProjects = projects.filter(
    (project) => project.featured
  ).length;

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pt-12">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <header className="mb-10 flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">
            <FolderKanban size={16} />
            <span>Portfolio management</span>
            <ChevronRight size={14} />
            <span>Projects</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Projects
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Create, edit, feature, and manage the projects displayed
            on your portfolio.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Plus size={17} />
          New project
        </Link>
      </header>

      {/* =====================================================
          NOTIFICATION
      ====================================================== */}

      {deleted && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Project deleted successfully.
        </div>
      )}

      {/* =====================================================
          PROJECT SUMMARY
      ====================================================== */}

      <section className="mb-8 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
        <article className="bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Total projects
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <FolderKanban size={17} />
            </span>
          </div>

          <p className="text-3xl font-semibold tracking-tight text-slate-950">
            {projects.length}
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">
            Portfolio projects
          </p>
        </article>

        <article className="bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Featured projects
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Star size={17} />
            </span>
          </div>

          <p className="text-3xl font-semibold tracking-tight text-slate-950">
            {featuredProjects}
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">
            Highlighted on your portfolio
          </p>
        </article>
      </section>

      {/* =====================================================
          PROJECTS CONTAINER
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* =================================================
            TABLE HEADER
        ================================================== */}

        <div className="hidden border-b border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:grid sm:grid-cols-[1fr_150px_90px_130px]">
          <span>Project</span>
          <span>Category</span>
          <span>Year</span>
          <span className="text-right">Actions</span>
        </div>

        {/* =================================================
            PROJECTS
        ================================================== */}

        {projects.length > 0 ? (
          <div className="divide-y divide-slate-100">

            {projects.map((project) => (
              <article
                key={project.slug}
                className="group grid gap-4 px-5 py-5 transition-colors hover:bg-slate-50/70 sm:grid-cols-[1fr_150px_90px_130px] sm:items-center sm:px-6"
              >

                {/* =========================================
                    PROJECT INFORMATION
                ========================================== */}

                <div className="min-w-0">
                  <div className="flex items-start gap-3">

                    {/* Project Icon */}

                    <div className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 sm:flex">
                      <FolderKanban size={16} />
                    </div>

                    <div className="min-w-0">

                      <Link
                        href={`/admin/projects/${project.slug}/edit`}
                        className="flex items-center gap-2 truncate text-sm font-semibold text-slate-950 transition hover:text-slate-600 sm:text-base"
                      >
                        <span className="truncate">
                          {project.title}
                        </span>

                        {project.featured && (
                          <Star
                            size={14}
                            className="shrink-0 fill-current text-amber-500"
                          />
                        )}
                      </Link>

                      <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                        /{project.slug}
                      </p>

                    </div>
                  </div>

                  {/* Mobile metadata */}

                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:hidden">

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                      {project.category}
                    </span>

                    <span className="text-xs text-slate-400">
                      {project.year}
                    </span>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                        <Star
                          size={10}
                          className="fill-current"
                        />
                        Featured
                      </span>
                    )}

                  </div>
                </div>

                {/* =========================================
                    CATEGORY
                ========================================== */}

                <span className="hidden text-sm text-slate-500 sm:block">
                  {project.category}
                </span>

                {/* =========================================
                    YEAR
                ========================================== */}

                <span className="hidden text-sm text-slate-500 sm:block">
                  {project.year}
                </span>

                {/* =========================================
                    ACTIONS
                ========================================== */}

                <div className="flex items-center justify-end gap-1">

                  {/* Edit */}

                  <Link
                    href={`/admin/projects/${project.slug}/edit`}
                    aria-label={`Edit ${project.title}`}
                    title="Edit project"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
                  >
                    <Pencil
                      size={16}
                      strokeWidth={1.8}
                    />
                  </Link>

                  {/* View */}

                  <Link
                    href={`/project/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title}`}
                    title="View project"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
                  >
                    <ExternalLink
                      size={16}
                      strokeWidth={1.8}
                    />
                  </Link>

                  <form action={deleteProjectAction.bind(null, project.slug)}>
                    <button type="submit" aria-label={`Delete ${project.title}`} title="Delete project" className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 size={16} strokeWidth={1.8} />
                    </button>
                  </form>

                </div>
              </article>
            ))}

          </div>
        ) : (

          /* =================================================
             EMPTY STATE
          ================================================== */

          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FolderKanban size={24} />
            </div>

            <h2 className="mt-5 text-base font-semibold text-slate-950">
              No projects yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Add your first portfolio project and it will appear
              here for you to manage.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Plus size={16} />
              Create first project
            </Link>

          </div>
        )}

      </section>

      {/* =====================================================
          FOOTER INFO
      ====================================================== */}

      {projects.length > 0 && (
        <div className="mt-4 flex items-center justify-between px-1 text-xs text-slate-400">
          <span>
            {projects.length}{" "}
            {projects.length === 1
              ? "project"
              : "projects"}
          </span>

          <span>
            {featuredProjects} featured
          </span>
        </div>
      )}

    </div>
  );
}
