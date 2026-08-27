
import Link from "next/link";
import {
  Plus,
  Pencil,
  ExternalLink,
  Trash2,
  FileText,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { requireAdmin } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/posts";
import { deletePostAction } from "@/app/admin/actions";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{
    deleted?: string;
    saved?: string;
    error?: string;
  }>;
}) {
  await requireAdmin();

  const posts = getAllPosts({
    includeDrafts: true,
  });

  const { deleted, saved, error } = await searchParams;

  const publishedCount = posts.filter(
    (post) => post.status !== "draft"
  ).length;

  const draftCount = posts.filter(
    (post) => post.status === "draft"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pt-12">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <header className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              {/* Breadcrumb */}
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span>Admin</span>
                <ChevronRight size={13} />
                <span>Content</span>
                <ChevronRight size={13} />
                <span className="text-slate-500">Posts</span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Blog posts
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Create, edit, publish, and manage the articles
                displayed on your portfolio.
              </p>
            </div>

            <Link
              href="/admin/posts/new"
              className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            >
              <Plus size={17} strokeWidth={2} />
              New post
            </Link>

          </div>
        </header>


        {/* =====================================================
            SUMMARY
        ====================================================== */}

        <section className="mb-6 grid gap-3 sm:grid-cols-3">

          <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total posts
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                  {posts.length}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <FileText size={17} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Published
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                  {publishedCount}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={17} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Drafts
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                  {draftCount}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock3 size={17} />
              </div>
            </div>
          </div>

        </section>


        {/* =====================================================
            NOTIFICATIONS
        ====================================================== */}

        {deleted && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={17} />
            <span>Post deleted successfully.</span>
          </div>
        )}

        {saved === "created" && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={17} />
            <span>Post created successfully.</span>
          </div>
        )}

        {saved === "updated" && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={17} />
            <span>Post updated successfully.</span>
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}


        {/* =====================================================
            POSTS TABLE
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="hidden border-b border-slate-100 bg-slate-50/80 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:grid sm:grid-cols-[minmax(0,1fr)_140px_120px_150px]">
            <span>Post</span>
            <span>Date</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>


          {/* POSTS */}

          {posts.length > 0 ? (
            <div className="divide-y divide-slate-100">

              {posts.map((post) => {
                const isDraft = post.status === "draft";

                return (
                  <article
                    key={post.slug}
                    className="group grid gap-4 px-5 py-5 transition-colors hover:bg-slate-50/70 sm:grid-cols-[minmax(0,1fr)_140px_120px_150px] sm:items-center sm:px-6"
                  >

                    {/* =================================================
                        POST
                    ================================================== */}

                    <div className="min-w-0">

                      <div className="flex items-start gap-3">

                        <div
                          className={`mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border sm:flex ${
                            isDraft
                              ? "border-amber-100 bg-amber-50 text-amber-600"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                        >
                          <FileText size={17} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <Link
                            href={`/admin/posts/${post.slug}/edit`}
                            className="block truncate text-sm font-semibold text-slate-950 transition hover:text-slate-600 sm:text-[15px]"
                          >
                            {post.title}
                          </Link>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            /{post.slug}
                          </p>

                        </div>

                      </div>


                      {/* MOBILE METADATA */}

                      <div className="mt-3 flex flex-wrap items-center gap-3 sm:hidden">

                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                          <CalendarDays size={13} />
                          {post.date}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                            isDraft
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isDraft
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                          />

                          {post.status ?? "published"}
                        </span>

                      </div>

                    </div>


                    {/* =================================================
                        DATE
                    ================================================== */}

                    <span className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
                      <CalendarDays
                        size={14}
                        className="text-slate-300"
                      />

                      {post.date}
                    </span>


                    {/* =================================================
                        STATUS
                    ================================================== */}

                    <span
                      className={`hidden w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex ${
                        isDraft
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isDraft
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />

                      {post.status ?? "published"}
                    </span>


                    {/* =================================================
                        ACTIONS
                    ================================================== */}

                    <div className="flex items-center justify-end gap-1">

                      {/* Edit */}

                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        aria-label={`Edit ${post.title}`}
                        title="Edit post"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      >
                        <Pencil
                          size={16}
                          strokeWidth={1.8}
                        />
                      </Link>


                      {/* View */}

                      {!isDraft && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${post.title}`}
                          title="View post"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                          <ExternalLink
                            size={16}
                            strokeWidth={1.8}
                          />
                        </Link>
                      )}


                      {/* Delete */}

                      <form
                        action={deletePostAction.bind(
                          null,
                          post.slug
                        )}
                      >
                        <button
                          type="submit"
                          aria-label={`Delete ${post.title}`}
                          title="Delete post"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
                        >
                          <Trash2
                            size={16}
                            strokeWidth={1.8}
                          />
                        </button>
                      </form>

                    </div>

                  </article>
                );
              })}

            </div>
          ) : (

            /* =================================================
               EMPTY STATE
            ================================================== */

            <div className="flex flex-col items-center justify-center px-6 py-24 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400">
                <FileText size={26} />
              </div>

              <h2 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                No blog posts yet
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Start building your blog by creating your first
                article. Your published posts will appear on your
                portfolio.
              </p>

              <Link
                href="/admin/posts/new"
                className="mt-7 inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Plus size={16} />
                Create first post
              </Link>

            </div>

          )}

        </section>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        {posts.length > 0 && (
          <div className="mt-4 flex items-center justify-between px-1 text-xs font-medium text-slate-400">
            <span>
              {posts.length}{" "}
              {posts.length === 1 ? "post" : "posts"}
            </span>

            <span>
              {publishedCount} published · {draftCount} drafts
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

