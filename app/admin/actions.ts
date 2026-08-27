"use server";

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearAdminSession,
  requireAdmin,
  setAdminSession,
} from "@/lib/admin-auth";

import {
  createPost,
  deletePost,
  getPostBySlug,
  updatePost,
  type PostInput,
  type PostStatus,
} from "@/lib/posts";

import {
  createProject,
  deleteProject,
  getProjectBySlug,
  updateProject,
  type ProjectInput,
} from "@/lib/projects";

import { updateSiteSettings } from "@/lib/site-settings";
import { deletePortfolioFile, uploadPortfolioFile } from "@/lib/supabase/storage";

/* =========================================================
   UPLOAD CONFIG
========================================================= */

const POSTS_UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "uploads",
  "posts"
);

const PROJECTS_UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "uploads",
  "projects"
);

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const VIDEOS_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "videos");
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

/* =========================================================
   IMAGE UPLOAD
========================================================= */

async function saveUploadedImage(
  file: File,
  folder: "posts" | "projects"
): Promise<string | undefined> {
  if (
    !file ||
    !(file instanceof File) ||
    file.size === 0
  ) {
    return undefined;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      "Invalid image type. Please upload JPG, PNG, WEBP, or GIF."
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "Image is too large. Maximum size is 5MB."
    );
  }

  return uploadPortfolioFile(file, folder);
}

async function saveUploadedVideo(file: File): Promise<string | undefined> {
  if (!file || !(file instanceof File) || file.size === 0) return undefined;
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    throw new Error("Invalid video type. Please upload MP4, WebM, OGG, or MOV.");
  }
  if (file.size > MAX_VIDEO_SIZE) throw new Error("Video is too large. Maximum size is 100MB.");
  return uploadPortfolioFile(file, "videos");
}

function validVideoSource(value: string): boolean {
  if (!value) return true;
  if (value.startsWith("/uploads/videos/")) return true;
  try {
    const url = new URL(value);
    return ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(url.hostname);
  } catch {
    return false;
  }
}

/* =========================================================
   DELETE LOCAL IMAGE
========================================================= */

function deleteLocalImage(imagePath?: string) {
  if (!imagePath) {
    return;
  }

  void deletePortfolioFile(imagePath);
}

/* =========================================================
   POST INPUT
========================================================= */

async function postInput(
  formData: FormData
): Promise<PostInput> {
  const value = (name: string) =>
    String(formData.get(name) ?? "").trim();

  const title = value("title");
  const date = value("date");
  const body = value("body");
  const status = value("status");

  if (!title || !date || !body) {
    throw new Error(
      "Title, date, and content are required."
    );
  }

  if (
    status !== "draft" &&
    status !== "published"
  ) {
    throw new Error(
      "Invalid post status."
    );
  }

  const imageFile = formData.get("imageFile");
  const videoFile = formData.get("videoFile");

  let image = value("image");

  if (
    imageFile instanceof File &&
    imageFile.size > 0
  ) {
    image =
      (await saveUploadedImage(
        imageFile,
        "posts"
      )) ?? image;
  }

  let video = value("video");
  if (videoFile instanceof File && videoFile.size > 0) video = (await saveUploadedVideo(videoFile)) ?? video;
  if (!validVideoSource(video)) throw new Error("Use a YouTube link or upload a video file.");

  return {
    title,
    slug: value("slug"),
    subheading: value("subheading"),
    author: value("author"),
    date,
    image,
    video: video || undefined,
    status: status as PostStatus,
    body,
  };
}

/* =========================================================
   PROJECT INPUT
========================================================= */

async function projectInput(
  formData: FormData
): Promise<ProjectInput> {
  const value = (name: string) =>
    String(formData.get(name) ?? "").trim();

  const technologies = value("technologies")
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const title = value("title");
  const category = value("category");
  const year = value("year");
  const description = value("description");

  if (
    !title ||
    !category ||
    !year ||
    !description
  ) {
    throw new Error(
      "Title, category, year, and description are required."
    );
  }

  const imageFile = formData.get("imageFile");
  const videoFile = formData.get("videoFile");

  let image =
    value("image") || undefined;

  if (
    imageFile instanceof File &&
    imageFile.size > 0
  ) {
    image =
      (await saveUploadedImage(
        imageFile,
        "projects"
      )) ?? image;
  }

  let video = value("video");
  if (videoFile instanceof File && videoFile.size > 0) video = (await saveUploadedVideo(videoFile)) ?? video;
  if (!validVideoSource(video)) throw new Error("Use a YouTube link or upload a video file.");

  return {
    title,
    slug: value("slug"),
    description,
    longDescription:
      value("longDescription") ||
      undefined,
    image,
    video: video || undefined,
    category,
    year,
    technologies,
    liveUrl:
      value("liveUrl") ||
      undefined,
    featured:
      formData.get("featured") === "on",
  };
}

/* =========================================================
   CACHE - POSTS
========================================================= */

function refreshPosts(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/posts");

  if (slug) {
    revalidatePath(`/blog/${slug}`);

    revalidatePath(
      `/admin/posts/${slug}/edit`
    );
  }
}

/* =========================================================
   CACHE - PROJECTS
========================================================= */

function refreshProjects(slug?: string) {
  revalidatePath("/project");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  if (slug) {
    revalidatePath(`/project/${slug}`);

    revalidatePath(
      `/admin/projects/${slug}/edit`
    );
  }
}

/* =========================================================
   AUTH
========================================================= */

/**
 * Admin login
 *
 * The login form must contain:
 *
 * name="username"
 * name="password"
 *
 * setAdminSession() checks the credentials,
 * creates the secure session cookie,
 * and returns true/false.
 */
export async function loginAction(
  formData: FormData
) {
  const username = String(
    formData.get("username") ?? ""
  ).trim();

  const password = String(
    formData.get("password") ?? ""
  );
  const requestedPath = String(
    formData.get("next") ?? ""
  );
  const destination =
    requestedPath.startsWith("/admin") &&
    !requestedPath.startsWith("/admin/login")
      ? requestedPath
      : "/admin";

  // Make sure both fields were submitted.
  if (!username || !password) {
    redirect(
      "/admin/login?error=missing"
    );
  }

  let authenticated = false;

  try {
    // Authenticate the admin and create the signed session cookie.
    authenticated = await setAdminSession(
      username,
      password
    );
  } catch (error) {
    // A missing server-side credential should never leave the visitor on a
    // generic error screen. It is safe to identify this as a configuration
    // problem without exposing any credential values.
    if (
      error instanceof Error &&
      error.message.includes("environment variables")
    ) {
      redirect("/admin/login?error=config");
    }

    throw error;
  }

  // Invalid username/password.
  if (!authenticated) {
    redirect(
      "/admin/login?error=invalid"
    );
  }

  // Successful login.
  redirect(destination);
}

/* =========================================================
   LOGOUT
========================================================= */

export async function logoutAction() {
  await clearAdminSession();

  redirect("/admin/login");
}

/* =========================================================
   CREATE POST
========================================================= */

export async function createPostAction(
  formData: FormData
) {
  // Only authenticated admins can create posts.
  await requireAdmin();

  try {
    const input =
      await postInput(formData);

    const slug = createPost(input);

    refreshPosts(slug);

    redirect(
      `/admin/posts/${slug}/edit?saved=created`
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message
    ) {
      redirect(
        `/admin/posts?error=${encodeURIComponent(
          error.message
        )}`
      );
    }

    redirect(
      "/admin/posts?error=Unable%20to%20create%20post"
    );
  }
}

/* =========================================================
   UPDATE POST
========================================================= */

export async function updatePostAction(
  previousSlug: string,
  formData: FormData
) {
  // Only authenticated admins can update posts.
  await requireAdmin();

  try {
    const oldImage = String(
      formData.get("currentImage") ?? ""
    ).trim();
    const oldVideo = String(formData.get("currentVideo") ?? "").trim();

    const input =
      await postInput(formData);

    const slug = updatePost(
      previousSlug,
      input
    );

    // Delete old image only if a new image
    // was actually uploaded.
    if (
      oldImage &&
      input.image &&
      oldImage !== input.image
    ) {
      deleteLocalImage(oldImage);
    }

    if (oldVideo && oldVideo !== input.video) deleteLocalImage(oldVideo);

    refreshPosts(previousSlug);
    refreshPosts(slug);

    redirect(
      `/admin/posts/${slug}/edit?saved=updated`
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message
    ) {
      redirect(
        `/admin/posts/${previousSlug}/edit?error=${encodeURIComponent(
          error.message
        )}`
      );
    }

    redirect(
      `/admin/posts/${previousSlug}/edit?error=Unable%20to%20update%20post`
    );
  }
}

/* =========================================================
   DELETE POST
========================================================= */

export async function deletePostAction(
  slug: string
) {
  // Only authenticated admins can delete posts.
  await requireAdmin();

  try {
    const post = getPostBySlug(slug);
    deletePost(slug);
    deleteLocalImage(post?.image);
    deleteLocalImage(post?.video);

    refreshPosts(slug);

    redirect(
      "/admin/posts?deleted=1"
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message
    ) {
      redirect(
        `/admin/posts?error=${encodeURIComponent(
          error.message
        )}`
      );
    }

    redirect(
      "/admin/posts?error=Unable%20to%20delete%20post"
    );
  }
}

/* =========================================================
   CREATE PROJECT
========================================================= */

export async function createProjectAction(
  formData: FormData
) {
  // Only authenticated admins can create projects.
  await requireAdmin();

  try {
    const input =
      await projectInput(formData);

    const slug = await createProject(input);

    refreshProjects(slug);

    redirect(
      `/admin/projects/${slug}/edit?saved=created`
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message
    ) {
      redirect(
        `/admin/projects?error=${encodeURIComponent(
          error.message
        )}`
      );
    }

    redirect(
      "/admin/projects?error=Unable%20to%20create%20project"
    );
  }
}

/* =========================================================
   UPDATE PROJECT
========================================================= */

export async function updateProjectAction(
  previousSlug: string,
  formData: FormData
) {
  // Only authenticated admins can update projects.
  await requireAdmin();

  try {
    const oldImage = String(
      formData.get("currentImage") ?? ""
    ).trim();
    const oldVideo = String(formData.get("currentVideo") ?? "").trim();

    const input =
      await projectInput(formData);

    const slug = await updateProject(
      previousSlug,
      input
    );

    // Delete old image only if a new image
    // was actually uploaded.
    if (
      oldImage &&
      input.image &&
      oldImage !== input.image
    ) {
      deleteLocalImage(oldImage);
    }

    if (oldVideo && oldVideo !== input.video) deleteLocalImage(oldVideo);

    refreshProjects(previousSlug);
    refreshProjects(slug);

    redirect(
      `/admin/projects/${slug}/edit?saved=updated`
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message
    ) {
      redirect(
        `/admin/projects/${previousSlug}/edit?error=${encodeURIComponent(
          error.message
        )}`
      );
    }

    redirect(
      `/admin/projects/${previousSlug}/edit?error=Unable%20to%20update%20project`
    );
  }
}

/* =========================================================
   DELETE PROJECT
========================================================= */

export async function deleteProjectAction(
  slug: string
) {
  // Only authenticated admins can delete projects.
  await requireAdmin();

  try {
    const project = await getProjectBySlug(slug);
    await deleteProject(slug);
    deleteLocalImage(project?.image);
    deleteLocalImage(project?.video);

    refreshProjects(slug);

    redirect(
      "/admin/projects?deleted=1"
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message
    ) {
      redirect(
        `/admin/projects?error=${encodeURIComponent(
          error.message
        )}`
      );
    }

    redirect(
      "/admin/projects?error=Unable%20to%20delete%20project"
    );
  }
}

/* =========================================================
   AVAILABILITY TOGGLE
========================================================= */

export async function updateAvailabilityAction(
  formData: FormData
) {
  // Make sure only logged-in admins can change this.
  await requireAdmin();

  // Checkbox:
  //
  // checked   = "on"
  // unchecked = null
  const availableForWork =
    formData.get("availableForWork") === "on";

  // Save the new setting.
  await updateSiteSettings({
    availableForWork,
  });

  // Revalidate public portfolio.
  revalidatePath("/");

  // Revalidate admin dashboard.
  revalidatePath("/admin");

  // Revalidate settings page.
  revalidatePath("/admin/settings");

  // Stay on the SETTINGS page after clicking
  // the toggle.
  redirect(
    `/admin/settings?saved=availability&status=${
      availableForWork ? "on" : "off"
    }`
  );
}
