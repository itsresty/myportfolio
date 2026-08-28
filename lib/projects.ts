
import { unstable_noStore as noStore } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabasePublic } from "@/lib/supabase/public";
import { makeSlug } from "@/lib/posts";

import fs from "fs";
import path from "path";

/* =========================================================
   TYPES
========================================================= */

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  video?: string;
  category: string;
  year: string;
  technologies: string[];
  liveUrl?: string;
  featured?: boolean;
};

export type ProjectInput = Omit<Project, "slug"> & {
  slug?: string;
};

type ProjectRow = {
  slug: string;
  title: string;
  description: string;
  long_description: string | null;
  image: string | null;
  video: string | null;
  category: string;
  year: string;
  technologies: string[];
  live_url: string | null;
  featured: boolean;
};

/* =========================================================
   DATABASE ROW → PROJECT
========================================================= */

function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    longDescription: row.long_description ?? undefined,
    image: row.image ?? undefined,
    video: row.video ?? undefined,
    category: row.category,
    year: row.year,
    technologies: row.technologies ?? [],
    liveUrl: row.live_url ?? undefined,
    featured: row.featured,
  };
}

/* =========================================================
   ERROR HANDLING
========================================================= */

function throwError(error: { message: string } | null) {
  if (error) {
    throw new Error(error.message);
  }
}

/* =========================================================
   LEGACY FALLBACK PROJECTS

   Used only when Supabase cannot be reached.
========================================================= */

function legacyProjects(): Project[] {
  try {
    const file = path.join(
      process.cwd(),
      "content",
      "projects.json"
    );

    return JSON.parse(
      fs.readFileSync(file, "utf8")
    ) as Project[];
  } catch (error) {
    console.error(
      "Could not read legacy projects:",
      error
    );

    return [];
  }
}

/* =========================================================
   GET ALL PROJECTS

   noStore() prevents Next.js from serving an old cached
   version of the project list.
========================================================= */

export async function getAllProjects(): Promise<Project[]> {
  noStore();

  try {
    const { data, error } = await createSupabasePublic()
      .from("projects")
      .select(
        `
          slug,
          title,
          description,
          long_description,
          image,
          video,
          category,
          year,
          technologies,
          live_url,
          featured
        `
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return ((data ?? []) as ProjectRow[]).map(
      toProject
    );
  } catch (error) {
    console.error(
      "Supabase project read failed; using bundled project data:",
      error
    );

    return legacyProjects();
  }
}

/* =========================================================
   GET RECENT PROJECTS
========================================================= */

export async function getRecentProjects(
  limit = 3
): Promise<Project[]> {
  const projects = await getAllProjects();

  return projects.slice(0, limit);
}

/* =========================================================
   GET PROJECT BY SLUG

   Also prevents caching so edited projects show immediately.
========================================================= */

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  noStore();

  try {
    const { data, error } = await createSupabasePublic()
      .from("projects")
      .select(
        `
          slug,
          title,
          description,
          long_description,
          image,
          video,
          category,
          year,
          technologies,
          live_url,
          featured
        `
      )
      .eq("slug", makeSlug(slug))
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data
      ? toProject(data as ProjectRow)
      : undefined;
  } catch (error) {
    console.error(
      "Supabase project read failed; using bundled project data:",
      error
    );

    return legacyProjects().find(
      (project) =>
        project.slug === makeSlug(slug)
    );
  }
}

/* =========================================================
   PREPARE PROJECT VALUES
========================================================= */

function values(
  input: ProjectInput,
  slug: string
) {
  return {
    slug,

    title: input.title.trim(),

    description:
      input.description.trim(),

    long_description:
      input.longDescription?.trim() || null,

    image:
      input.image?.trim() || null,

    video:
      input.video?.trim() || null,

    category:
      input.category.trim(),

    year:
      input.year.trim(),

    technologies:
      input.technologies ?? [],

    live_url:
      input.liveUrl?.trim() || null,

    featured:
      Boolean(input.featured),

    updated_at:
      new Date().toISOString(),
  };
}

/* =========================================================
   CREATE PROJECT
========================================================= */

export async function createProject(
  input: ProjectInput
) {
  const slug = makeSlug(
    input.slug || input.title
  );

  if (!slug) {
    throw new Error(
      "Project title or slug is unavailable."
    );
  }

  const { error } =
    await createSupabaseAdmin()
      .from("projects")
      .insert(
        values(input, slug)
      );

  if (error?.code === "23505") {
    throw new Error(
      "A project with this title or slug already exists."
    );
  }

  throwError(error);

  return slug;
}

/* =========================================================
   UPDATE PROJECT
========================================================= */

export async function updateProject(
  oldSlug: string,
  input: ProjectInput
) {
  const slug = makeSlug(
    input.slug || input.title
  );

  if (!slug) {
    throw new Error(
      "Project title or slug is unavailable."
    );
  }

  const { data, error } =
    await createSupabaseAdmin()
      .from("projects")
      .update(
        values(input, slug)
      )
      .eq(
        "slug",
        makeSlug(oldSlug)
      )
      .select("slug");

  if (error?.code === "23505") {
    throw new Error(
      "A project with this title or slug already exists."
    );
  }

  throwError(error);

  if (!data?.length) {
    throw new Error(
      "Project not found."
    );
  }

  return slug;
}

/* =========================================================
   DELETE PROJECT
========================================================= */

export async function deleteProject(
  slug: string
) {
  const { data, error } =
    await createSupabaseAdmin()
      .from("projects")
      .delete()
      .eq(
        "slug",
        makeSlug(slug)
      )
      .select("slug");

  throwError(error);

  if (!data?.length) {
    throw new Error(
      "Project not found."
    );
  }

  return true;
}

