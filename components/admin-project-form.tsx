
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
  X,
} from "lucide-react";

import type { Project } from "@/lib/projects";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/app/admin/actions";

export default function AdminProjectForm({
  project,
}: {
  project?: Project;
}) {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    project?.image
  );

  const [imageName, setImageName] = useState("");

  const action = project
    ? updateProjectAction.bind(null, project.slug)
    : createProjectAction;

  const deleteAction = project
    ? deleteProjectAction.bind(null, project.slug)
    : undefined;

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageName(file.name);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  return (
    <form
      action={action}
      encType="multipart/form-data"
      className="mx-auto w-full max-w-6xl px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pt-12"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/admin/projects"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            All projects
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {project ? "Edit project" : "New project"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {project
              ? "Update your project information and image."
              : "Add a new project to your portfolio."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {project && (
            <Link
              href={`/project/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Eye size={17} />
              Preview
            </Link>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Save size={17} />
            Save project
          </button>
        </div>
      </header>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          {/* Title */}

          <label className="block text-sm font-semibold text-slate-900">
            Project title

            <input
              required
              name="title"
              defaultValue={project?.title}
              placeholder="Project name"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-base font-normal outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/5"
            />
          </label>


          {/* Short description */}

          <label className="block text-sm font-semibold text-slate-900">
            Short description

            <textarea
              required
              name="description"
              defaultValue={project?.description}
              rows={4}
              placeholder="Shown on project cards and the project page hero."
              className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal leading-7 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/5"
            />
          </label>


          {/* Long description */}

          <label className="block text-sm font-semibold text-slate-900">
            Long description

            <textarea
              name="longDescription"
              defaultValue={project?.longDescription}
              rows={12}
              placeholder="Write a detailed description of the project..."
              className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal leading-7 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/5"
            />
          </label>

        </section>


        {/* =================================================
            SIDEBAR
        ================================================== */}

        <aside className="space-y-6">

          {/* =================================================
              PROJECT DETAILS
          ================================================== */}

          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div>
              <h2 className="font-bold text-slate-950">
                Project details
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Basic information about this project.
              </p>
            </div>


            {/* Slug */}

            <label className="block text-sm font-medium text-slate-700">
              Slug

              <input
                name="slug"
                defaultValue={project?.slug}
                placeholder="created-from-title"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />

              <span className="mt-1.5 block text-xs font-normal text-slate-400">
                Leave empty to create it from the title.
              </span>
            </label>


            {/* Category */}

            <label className="block text-sm font-medium text-slate-700">
              Category

              <select
                required
                name="category"
                defaultValue={project?.category ?? "Web Development"}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              >
                <option value="Web Development">Web Development</option>
                <option value="Web App">Web App</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Video">Video</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Web Design">Web Design</option>
                <option value="IoT">IoT</option>
              </select>
            </label>


            {/* Year */}

            <label className="block text-sm font-medium text-slate-700">
              Year

              <input
                required
                name="year"
                defaultValue={
                  project?.year ?? new Date().getFullYear()
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>


            {/* Live URL */}

            <label className="block text-sm font-medium text-slate-700">
              Live URL

              <input
                name="liveUrl"
                defaultValue={project?.liveUrl}
                placeholder="https://example.com"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>


            {/* Technologies */}

            <label className="block text-sm font-medium text-slate-700">
              Technologies

              <textarea
                name="technologies"
                defaultValue={project?.technologies.join(", ")}
                rows={3}
                placeholder="Next.js, TypeScript, Tailwind CSS"
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950"
              />
            </label>


            {/* Featured */}

            <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project?.featured}
                className="h-4 w-4 rounded border-slate-300"
              />

              <span>Featured project</span>
            </label>

          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="font-bold text-slate-950">Project video</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">Paste a YouTube URL or upload a video (MP4, WebM, OGG, or MOV; max 100MB).</p>
            </div>
            <input name="video" defaultValue={project?.video} placeholder="https://www.youtube.com/watch?v=..." className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950" />
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-slate-950 hover:text-slate-950">
              <Upload size={16} /> Upload video
              <input type="file" name="videoFile" accept="video/mp4,video/webm,video/ogg,video/quicktime" className="hidden" />
            </label>
            <input type="hidden" name="currentVideo" value={project?.video ?? ""} readOnly />
          </section>


          {/* =================================================
              IMAGE UPLOAD
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-4">
              <h2 className="font-bold text-slate-950">
                Project image
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Upload an image from your computer.
              </p>
            </div>


            {/* Image preview */}

            {imagePreview ? (
              <div className="relative mb-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">

                <div className="relative aspect-[16/10]">
                  <Image
                    src={imagePreview}
                    alt={project?.title ?? "Project preview"}
                    fill
                    unoptimized={imagePreview.startsWith("blob:")}
                    className="object-cover"
                  />
                </div>

              </div>
            ) : (
              <div className="mb-4 flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <Upload
                    size={24}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    No image selected
                  </p>
                </div>
              </div>
            )}


            {/* Upload */}

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">

              <Upload size={16} />

              {imageName
                ? "Change image"
                : project?.image
                  ? "Replace image"
                  : "Upload image"}

              <input
                type="file"
                name="imageFile"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>


            {/* Existing image path */}

            <input
              type="hidden"
              name="image"
              value={project?.image ?? ""}
              readOnly
            />

            <input
              type="hidden"
              name="currentImage"
              value={project?.image ?? ""}
              readOnly
            />

            {imageName && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">

                <p className="truncate text-xs text-slate-500">
                  {imageName}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setImageName("");
                    setImagePreview(project?.image);
                  }}
                  className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-950"
                  aria-label="Remove selected image"
                >
                  <X size={14} />
                </button>

              </div>
            )}

            <p className="mt-3 text-[11px] leading-5 text-slate-400">
              JPG, PNG, WebP, or GIF. Images are stored securely in
              Supabase Storage.
            </p>

          </section>


          {/* =================================================
              DELETE
          ================================================== */}

          {deleteAction && (
            <section className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm">

              <h2 className="font-bold text-slate-950">
                Danger zone
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Deleting this project permanently removes it from
                your portfolio.
              </p>

              <button
                formAction={deleteAction}
                type="submit"
                onClick={(event) => {
                  if (
                    !window.confirm(
                      "Delete this project permanently?"
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
              >
                <Trash2 size={16} />
                Delete project
              </button>

            </section>
          )}

        </aside>

      </div>
    </form>
  );
}
