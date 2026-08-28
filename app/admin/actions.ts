
"use server";

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
import {
  createSkill,
  deleteSkill,
  updateSkill,
  type SkillCategory,
} from "@/lib/skills";
import {
  createCertification,
  deleteCertification,
  updateCertification,
  type CertificationInput,
} from "@/lib/certifications";
import {
  deletePortfolioFile,
  uploadPortfolioFile,
} from "@/lib/supabase/storage";

/* =========================================================
   UPLOAD CONFIG
========================================================= */

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
];

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

/* =========================================================
   VIDEO UPLOAD
========================================================= */

async function saveUploadedVideo(
  file: File
): Promise<string | undefined> {
  if (
    !file ||
    !(file instanceof File) ||
    file.size === 0
  ) {
    return undefined;
  }

  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    throw new Error(
      "Invalid video type. Please upload MP4, WebM, OGG, or MOV."
    );
  }

  if (file.size > MAX_VIDEO_SIZE) {
    throw new Error(
      "Video is too large. Maximum size is 100MB."
    );
  }

  return uploadPortfolioFile(file, "videos");
}

/* =========================================================
   VIDEO VALIDATION
========================================================= */

function validVideoSource(
  value: string
): boolean {
  if (!value) {
    return true;
  }

  if (value.startsWith("/uploads/videos/")) {
    return true;
  }

  try {
    const url = new URL(value);

    return [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "youtu.be",
    ].includes(url.hostname);
  } catch {
    return false;
  }
}

/* =========================================================
   DELETE FILE
========================================================= */

function deleteLocalImage(
  filePath?: string
) {
  if (!filePath) {
    return;
  }

  void deletePortfolioFile(filePath);
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

  const imageFile =
    formData.get("imageFile");

  const videoFile =
    formData.get("videoFile");

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

  if (
    videoFile instanceof File &&
    videoFile.size > 0
  ) {
    video =
      (await saveUploadedVideo(
        videoFile
      )) ?? video;
  }

  if (!validVideoSource(video)) {
    throw new Error(
      "Use a YouTube link or upload a video file."
    );
  }

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

  const imageFile =
    formData.get("imageFile");

  const videoFile =
    formData.get("videoFile");

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

  if (
    videoFile instanceof File &&
    videoFile.size > 0
  ) {
    video =
      (await saveUploadedVideo(
        videoFile
      )) ?? video;
  }

  if (!validVideoSource(video)) {
    throw new Error(
      "Use a YouTube link or upload a video file."
    );
  }

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

function refreshPosts(
  slug?: string,
  previousSlug?: string
) {
  // Homepage
  revalidatePath("/");

  // Public blog pages
  revalidatePath("/blog");

  // Admin pages
  revalidatePath("/admin");
  revalidatePath("/admin/posts");

  // Current post
  if (slug) {
    revalidatePath(`/blog/${slug}`);

    revalidatePath(
      `/admin/posts/${slug}/edit`
    );
  }

  // Old URL when slug changes
  if (
    previousSlug &&
    previousSlug !== slug
  ) {
    revalidatePath(
      `/blog/${previousSlug}`
    );

    revalidatePath(
      `/admin/posts/${previousSlug}/edit`
    );
  }
}

/* =========================================================
   CACHE - PROJECTS
========================================================= */

function refreshProjects(
  slug?: string,
  previousSlug?: string
) {
  // Homepage
  revalidatePath("/");

  // Public project listing pages
  revalidatePath("/projects");
  revalidatePath("/project");

  // Admin pages
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  // Current project page
  if (slug) {
    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/project/${slug}`);

    revalidatePath(
      `/admin/projects/${slug}/edit`
    );
  }

  // Old project URL when slug changes
  if (
    previousSlug &&
    previousSlug !== slug
  ) {
    revalidatePath(
      `/projects/${previousSlug}`
    );

    revalidatePath(
      `/project/${previousSlug}`
    );

    revalidatePath(
      `/admin/projects/${previousSlug}/edit`
    );
  }
}

/* =========================================================
   AUTH - LOGIN
========================================================= */

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
    !requestedPath.startsWith(
      "/admin/login"
    )
      ? requestedPath
      : "/admin";

  if (!username || !password) {
    redirect(
      "/admin/login?error=missing"
    );
  }

  let authenticated = false;

  try {
    authenticated =
      await setAdminSession(
        username,
        password
      );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(
        "environment variables"
      )
    ) {
      redirect(
        "/admin/login?error=config"
      );
    }

    throw error;
  }

  if (!authenticated) {
    redirect(
      "/admin/login?error=invalid"
    );
  }

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
  await requireAdmin();

  try {
    const input =
      await postInput(formData);

    const slug =
      await createPost(input);

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
  await requireAdmin();

  try {
    const oldImage = String(
      formData.get("currentImage") ?? ""
    ).trim();

    const oldVideo = String(
      formData.get("currentVideo") ?? ""
    ).trim();

    const input =
      await postInput(formData);

    const slug =
      await updatePost(
        previousSlug,
        input
      );

    if (
      oldImage &&
      input.image &&
      oldImage !== input.image
    ) {
      deleteLocalImage(oldImage);
    }

    if (
      oldVideo &&
      oldVideo !== input.video
    ) {
      deleteLocalImage(oldVideo);
    }

    refreshPosts(
      slug,
      previousSlug
    );

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
  await requireAdmin();

  try {
    const post =
      await getPostBySlug(
        slug,
        {
          includeDrafts: true,
        }
      );

    await deletePost(slug);

    deleteLocalImage(
      post?.image
    );

    deleteLocalImage(
      post?.video
    );

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
  await requireAdmin();

  try {
    const input =
      await projectInput(formData);

    const slug =
      await createProject(input);

    // Refresh public and admin pages
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
  await requireAdmin();

  try {
    const oldImage = String(
      formData.get("currentImage") ?? ""
    ).trim();

    const oldVideo = String(
      formData.get("currentVideo") ?? ""
    ).trim();

    const input =
      await projectInput(formData);

    const slug =
      await updateProject(
        previousSlug,
        input
      );

    // Delete old image if it was replaced.
    if (
      oldImage &&
      input.image &&
      oldImage !== input.image
    ) {
      deleteLocalImage(
        oldImage
      );
    }

    // Delete old video if it was replaced.
    if (
      oldVideo &&
      oldVideo !== input.video
    ) {
      deleteLocalImage(
        oldVideo
      );
    }

    // Refresh new and old URLs.
    refreshProjects(
      slug,
      previousSlug
    );

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
  await requireAdmin();

  try {
    // Get project first so we can remove
    // associated Supabase Storage files.
    const project =
      await getProjectBySlug(
        slug
      );

    // Delete database record.
    await deleteProject(slug);

    // Delete image from storage.
    deleteLocalImage(
      project?.image
    );

    // Delete video from storage.
    deleteLocalImage(
      project?.video
    );

    // Refresh all relevant pages.
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
  await requireAdmin();

  const availableForWork =
    formData.get(
      "availableForWork"
    ) === "on";

  await updateSiteSettings({
    availableForWork,
  });

  // Refresh public portfolio.
  revalidatePath("/");

  // Refresh admin dashboard.
  revalidatePath("/admin");

  // Refresh settings page.
  revalidatePath(
    "/admin/settings"
  );

  redirect(
    `/admin/settings?saved=availability&status=${
      availableForWork
        ? "on"
        : "off"
    }`
  );
}

function skillInput(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    category: String(formData.get("category") ?? "") as SkillCategory,
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  };
}

export async function createSkillAction(formData: FormData) {
  await requireAdmin();
  try {
    await createSkill(skillInput(formData));
    revalidatePath("/about");
    revalidatePath("/admin/skills");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unable to create skill.");
  }
}

export async function updateSkillAction(id: string, formData: FormData) {
  await requireAdmin();
  try {
    await updateSkill(id, skillInput(formData));
    revalidatePath("/about");
    revalidatePath("/admin/skills");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unable to update skill.");
  }
}

export async function deleteSkillAction(id: string) {
  await requireAdmin();
  try {
    await deleteSkill(id);
    revalidatePath("/about");
    revalidatePath("/admin/skills");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unable to delete skill.");
  }
}

async function certificationInput(formData: FormData): Promise<CertificationInput> {
  const value = (name: string) => String(formData.get(name) ?? "").trim();
  const imageFile = formData.get("imageFile");
  const pdfFile = formData.get("pdfFile");
  let image = value("image");
  let pdf = value("pdf");

  if (imageFile instanceof File && imageFile.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type) || imageFile.size > MAX_IMAGE_SIZE) {
      throw new Error("Certificate image must be a JPG, PNG, WEBP, or GIF under 5MB.");
    }
    image = await uploadPortfolioFile(imageFile, "certifications");
  }
  if (pdfFile instanceof File && pdfFile.size > 0) {
    if (pdfFile.type !== "application/pdf" || pdfFile.size > 10 * 1024 * 1024) {
      throw new Error("Certificate file must be a PDF under 10MB.");
    }
    pdf = await uploadPortfolioFile(pdfFile, "certifications");
  }

  return { title: value("title"), issuer: value("issuer"), year: Number(value("year")), image, pdf };
}

export async function createCertificationAction(formData: FormData) {
  await requireAdmin();
  try {
    await createCertification(await certificationInput(formData));
    revalidatePath("/");
    revalidatePath("/certifications");
    revalidatePath("/admin/certifications");
    redirect("/admin/certifications?saved=created");
  } catch (error) {
    redirect(`/admin/certifications/new?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to create certification")}`);
  }
}

export async function updateCertificationAction(id: string, formData: FormData) {
  await requireAdmin();
  try {
    const previousImage = String(formData.get("currentImage") ?? "");
    const previousPdf = String(formData.get("currentPdf") ?? "");
    const input = await certificationInput(formData);
    await updateCertification(id, input);
    if (previousImage && previousImage !== input.image) void deletePortfolioFile(previousImage);
    if (previousPdf && previousPdf !== input.pdf) void deletePortfolioFile(previousPdf);
    revalidatePath("/");
    revalidatePath("/certifications");
    revalidatePath("/admin/certifications");
    redirect("/admin/certifications?saved=updated");
  } catch (error) {
    redirect(`/admin/certifications/${id}/edit?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to update certification")}`);
  }
}

export async function deleteCertificationAction(id: string, image?: string, pdf?: string) {
  await requireAdmin();
  try {
    await deleteCertification(id);
    void deletePortfolioFile(image);
    void deletePortfolioFile(pdf);
    revalidatePath("/");
    revalidatePath("/certifications");
    revalidatePath("/admin/certifications");
    redirect("/admin/certifications?deleted=1");
  } catch (error) {
    redirect(`/admin/certifications?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to delete certification")}`);
  }
}
