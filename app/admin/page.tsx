
import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  FileText,
  FolderKanban,
  Plus,
  Radio,
  TrendingUp,
  ChevronRight,
  PenLine,
  ExternalLink,
} from "lucide-react";

import AdminAvailabilityToggle from "@/components/admin-availability-toggle";
import AdminLiveViews from "@/components/admin-live-views";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { getSiteSettings } from "@/lib/site-settings";
import { getViewAnalytics } from "@/lib/view-analytics";

export default async function AdminPage() {
  await requireAdmin();

  const posts = getAllPosts({ includeDrafts: true });
  const projects = await getAllProjects();
  const { availableForWork } = getSiteSettings();
  const viewAnalytics = getViewAnalytics();

  const publishedPosts = posts.filter(
    (post) => post.status !== "draft"
  ).length;

  const draftPosts = posts.length - publishedPosts;

  const featuredProjects = projects.filter(
    (project) => project.featured
  ).length;

  const publishedPercentage =
    posts.length > 0
      ? Math.round((publishedPosts / posts.length) * 100)
      : 0;

  const featuredPercentage =
    projects.length > 0
      ? Math.round((featuredProjects / projects.length) * 100)
      : 0;

  const stats = [
    {
      label: "Portfolio views",
      value: <AdminLiveViews initial={viewAnalytics} />,
      description: "Total page views · live updates",
      icon: Eye,
    },
    {
      label: "Projects",
      value: projects.length,
      description: `${featuredProjects} featured`,
      icon: FolderKanban,
    },
    {
      label: "Published posts",
      value: publishedPosts,
      description: `${draftPosts} drafts`,
      icon: FileText,
    },
    {
      label: "Availability",
      value: availableForWork ? "Available" : "Unavailable",
      description: availableForWork
        ? "Open to new work"
        : "Not accepting work",
      icon: Radio,
      active: availableForWork,
    },
  ];

  const activities = [
    ...projects.slice(0, 2).map((project) => ({
      title: project.title,
      detail: `${project.category} · ${project.year}`,
      tag: "Project",
      href: `/admin/projects/${project.slug}/edit`,
    })),

    ...posts.slice(0, 2).map((post) => ({
      title: post.title,
      detail: `${post.status ?? "published"} · ${post.date}`,
      tag: "Post",
      href: `/admin/posts/${post.slug}/edit`,
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pt-10">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className="mb-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                <span>Admin</span>
                <ChevronRight size={12} />
                <span>Overview</span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage your portfolio, projects, articles, and
                availability from one central workspace.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
              >
                <ExternalLink size={15} />
                View site
              </Link>

              <Link
                href="/admin/posts/new"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Plus size={17} />
                Create post
              </Link>
            </div>
          </div>
        </header>

        {/* =====================================================
            STATS
        ====================================================== */}
        <section className="mb-8 grid overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(
            ({
              label,
              value,
              description,
              icon: Icon,
              active,
            }) => (
              <article
                key={label}
                className="group border-b border-slate-200 p-5 transition hover:bg-slate-50 sm:p-6 xl:border-b-0 xl:border-r last:border-r-0"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                  </span>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                      active === true
                        ? "bg-emerald-50 text-emerald-600"
                        : active === false
                          ? "bg-slate-100 text-slate-400"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <p
                    className={`text-2xl font-semibold tracking-tight sm:text-3xl ${
                      label === "Availability" && availableForWork
                        ? "text-emerald-600"
                        : "text-slate-950"
                    }`}
                  >
                    {value}
                  </p>

                  {label === "Availability" && (
                    <span className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          availableForWork
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                        }`}
                      />
                      Live
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {description}
                </p>
              </article>
            )
          )}
        </section>

        {/* =====================================================
            AVAILABILITY
        ====================================================== */}
        <section className="mb-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                Work status
              </p>
            </div>

            <div className="p-1">
              <AdminAvailabilityToggle
                availableForWork={availableForWork}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}
        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">

          {/* ===================================================
              CONTENT OVERVIEW
          ==================================================== */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-950">
                    Content overview
                  </h2>

                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                    {posts.length + projects.length} items
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor the content currently powering your portfolio.
                </p>
              </div>

              <Link
                href="/admin/posts"
                className="hidden items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-slate-950 sm:flex"
              >
                Manage
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="p-6">

              {/* POSTS */}
              <div className="mb-8">
                <div className="mb-3 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                        <FileText size={14} className="text-slate-600" />
                      </span>

                      <p className="text-sm font-semibold text-slate-800">
                        Published posts
                      </p>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      {publishedPosts} published · {draftPosts} drafts
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    {publishedPercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all duration-500"
                    style={{
                      width: `${publishedPercentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* PROJECTS */}
              <div>
                <div className="mb-3 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50">
                        <FolderKanban
                          size={14}
                          className="text-emerald-600"
                        />
                      </span>

                      <p className="text-sm font-semibold text-slate-800">
                        Featured projects
                      </p>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      {featuredProjects} featured · {projects.length} total
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    {featuredPercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${featuredPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </article>

          {/* ===================================================
              RECENT ACTIVITY
          ==================================================== */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Recent activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest editable content.
                </p>
              </div>

              <Link
                href="/admin/posts"
                className="flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-slate-950"
              >
                View all
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <Link
                    href={activity.href}
                    key={`${activity.tag}-${activity.title}`}
                    className="group flex items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                        activity.tag === "Project"
                          ? "bg-violet-50 text-violet-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {activity.tag === "Project" ? (
                        <FolderKanban size={15} />
                      ) : (
                        <FileText size={15} />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-slate-800 group-hover:text-slate-950">
                          {activity.title}
                        </span>

                        <span className="hidden shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:inline">
                          {activity.tag}
                        </span>
                      </span>

                      <span className="mt-1 block text-xs text-slate-400">
                        {activity.detail}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700"
                    />
                  </Link>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <PenLine size={16} className="text-slate-400" />
                  </div>

                  <p className="text-sm font-medium text-slate-500">
                    No recent activity
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Your latest projects and posts will appear here.
                  </p>
                </div>
              )}
            </div>
          </article>
        </section>

        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">

          <Link
            href="/admin/projects"
            className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <FolderKanban size={19} />
              </span>

              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  Manage projects
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Add, edit, and organize portfolio projects
                </span>
              </span>
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-slate-100">
              <ArrowUpRight
                size={16}
                className="text-slate-400 transition group-hover:text-slate-700"
              />
            </span>
          </Link>

          <Link
            href="/admin/settings"
            className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp size={19} />
              </span>

              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  Availability settings
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Control whether you are accepting new work
                </span>
              </span>
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-slate-100">
              <ArrowUpRight
                size={16}
                className="text-slate-400 transition group-hover:text-slate-700"
              />
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
