"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  ArrowLeft,
  Eye,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

import { toast } from "sonner";

import type {
  Post,
  PostStatus,
} from "@/lib/posts";

import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/app/admin/actions";

export default function AdminPostForm({
  post,
}: {
  post?: Post;
}) {
  const [status, setStatus] =
    useState<PostStatus>(
      post?.status ?? "draft"
    );

  const [imagePreview, setImagePreview] =
    useState<string | null>(
      post?.image ?? null
    );

  const action = post
    ? updatePostAction.bind(
        null,
        post.slug
      )
    : createPostAction;

  const deleteAction = post
    ? deletePostAction.bind(
        null,
        post.slug
      )
    : undefined;

  /* =========================================================
     SAVE CONFIRMATION
  ========================================================= */

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const message = post
      ? "Save these changes to this post?"
      : "Create this new blog post?";

    const confirmed = window.confirm(
      message
    );

    if (!confirmed) {
      event.preventDefault();

      toast.info("Changes were not saved.");
      return;
    }

    toast.loading(
      post
        ? "Saving changes..."
        : "Creating post...",
      {
        id: "post-save",
      }
    );
  }

  /* =========================================================
     DELETE CONFIRMATION
  ========================================================= */

  function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${post?.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      event.preventDefault();

      toast.info("Post was not deleted.");
      return;
    }

    toast.loading("Deleting post...", {
      id: "post-delete",
    });
  }

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please upload JPG, PNG, WebP, or AVIF."
      );

      event.target.value = "";
      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        "Image must be smaller than 5MB."
      );

      event.target.value = "";
      return;
    }

    const preview =
      URL.createObjectURL(file);

    setImagePreview(preview);

    toast.success(
      "Image selected successfully."
    );
  }

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mx-auto max-w-5xl px-5 pb-12 pt-20 sm:px-8 lg:pt-10"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/posts"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950"
          >
            <ArrowLeft size={16} />

            All posts
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            {post
              ? "Edit post"
              : "New post"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {post?.status ===
            "published" && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
            >
              <Eye size={17} />

              Preview
            </Link>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Save size={17} />

            {post
              ? "Save changes"
              : "Create post"}
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* ===================================================
            CONTENT
        ==================================================== */}

        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* TITLE */}

          <label className="block text-sm font-semibold">
            Title

            <input
              required
              name="title"
              defaultValue={
                post?.title
              }
              placeholder="A clear, compelling title"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-slate-950"
            />
          </label>

          {/* EXCERPT */}

          <label className="block text-sm font-semibold">
            Excerpt

            <input
              name="subheading"
              defaultValue={
                post?.subheading
              }
              placeholder="A short summary for your blog index"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-950"
            />
          </label>

          {/* CONTENT */}

          <label className="block text-sm font-semibold">
            Content{" "}
            <span className="font-normal text-slate-400">
              (MDX supported)
            </span>

            <textarea
              required
              name="body"
              defaultValue={
                post?.body
              }
              rows={22}
              placeholder={`# Your heading

Start writing your post...`}
              className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-slate-950"
            />
          </label>
        </section>

        {/* ===================================================
            SIDEBAR
        ==================================================== */}

        <aside className="space-y-5">
          {/* =================================================
              PUBLISHING
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">
              Publishing
            </h2>

            <label className="mt-4 block text-sm font-medium">
              Status

              <select
                name="status"
                value={status}
                onChange={(event) => {
                  const nextStatus =
                    event.target.value as PostStatus;

                  if (
                    nextStatus !== status
                  ) {
                    const confirmed =
                      window.confirm(
                        `Change post status from "${status}" to "${nextStatus}"?`
                      );

                    if (!confirmed) {
                      return;
                    }

                    toast.success(
                      `Status changed to ${nextStatus}.`
                    );
                  }

                  setStatus(
                    nextStatus
                  );
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>
            </label>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Drafts stay out of your public
              blog until published.
            </p>
          </section>

          {/* =================================================
              POST DETAILS
          ================================================== */}

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">
              Post details
            </h2>

            {/* SLUG */}

            <label className="block text-sm font-medium">
              Slug

              <input
                name="slug"
                defaultValue={
                  post?.slug
                }
                placeholder="created-from-title"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950"
              />
            </label>

            {/* AUTHOR */}

            <label className="block text-sm font-medium">
              Author

              <input
                name="author"
                defaultValue={
                  post?.author ??
                  "Resty Montero"
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950"
              />
            </label>

            {/* DATE */}

            <label className="block text-sm font-medium">
              Date

              <input
                required
                type="date"
                name="date"
                defaultValue={
                  post?.date
                    ? new Date(
                        post.date
                      )
                        .toISOString()
                        .slice(
                          0,
                          10
                        )
                    : new Date()
                        .toISOString()
                        .slice(
                          0,
                          10
                        )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950"
              />
            </label>

            {/* IMAGE */}

            <div>
              <label className="block text-sm font-medium">
                Cover image
              </label>

              {/* Current image */}

              {imagePreview && (
                <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={imagePreview}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Image path */}

              <input
                name="image"
                defaultValue={
                  post?.image
                }
                placeholder="/images/blog/cover.jpg"
                className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950"
              />

              {/* Local upload */}

              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm font-medium text-slate-600 transition hover:border-slate-950 hover:text-slate-950">
                <Upload size={16} />

                Choose image

                <input
                  type="file"
                  name="imageFile"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={
                    handleImageChange
                  }
                  className="hidden"
                />
              </label>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                JPG, PNG, WebP or AVIF.
                Maximum 5MB.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <label className="block text-sm font-medium">Post video</label>
              <p className="mt-1 text-xs leading-5 text-slate-500">Paste a YouTube URL or upload a video (MP4, WebM, OGG, or MOV; max 100MB).</p>
              <input name="video" defaultValue={post?.video} placeholder="https://www.youtube.com/watch?v=..." className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950" />
              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-slate-950 hover:text-slate-950">
                <Upload size={16} /> Upload video
                <input type="file" name="videoFile" accept="video/mp4,video/webm,video/ogg,video/quicktime" className="hidden" />
              </label>
              <input type="hidden" name="currentVideo" value={post?.video ?? ""} readOnly />
            </div>
          </section>

          {/* =================================================
              DELETE
          ================================================== */}

          {deleteAction && (
            <button
              formAction={deleteAction}
              type="submit"
              onClick={handleDelete}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              <Trash2 size={16} />

              Delete post
            </button>
          )}
        </aside>
      </div>
    </form>
  );
}
