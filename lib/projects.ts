import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabasePublic } from "@/lib/supabase/public";
import { makeSlug } from "@/lib/posts";

export type Project = { slug: string; title: string; description: string; longDescription?: string; image?: string; video?: string; category: string; year: string; technologies: string[]; liveUrl?: string; featured?: boolean };
export type ProjectInput = Omit<Project, "slug"> & { slug?: string };

type ProjectRow = {
  slug: string; title: string; description: string; long_description: string | null;
  image: string | null; video: string | null; category: string; year: string;
  technologies: string[]; live_url: string | null; featured: boolean;
};

function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug, title: row.title, description: row.description,
    longDescription: row.long_description ?? undefined, image: row.image ?? undefined,
    video: row.video ?? undefined, category: row.category, year: row.year,
    technologies: row.technologies ?? [], liveUrl: row.live_url ?? undefined, featured: row.featured,
  };
}

function throwError(error: { message: string } | null) { if (error) throw new Error(error.message); }

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await createSupabasePublic().from("projects")
    .select("slug,title,description,long_description,image,video,category,year,technologies,live_url,featured")
    .order("created_at", { ascending: false });
  throwError(error);
  return ((data ?? []) as ProjectRow[]).map(toProject);
}

export async function getRecentProjects(limit = 3): Promise<Project[]> { return (await getAllProjects()).slice(0, limit); }

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const { data, error } = await createSupabasePublic().from("projects")
    .select("slug,title,description,long_description,image,video,category,year,technologies,live_url,featured")
    .eq("slug", makeSlug(slug)).maybeSingle();
  throwError(error);
  return data ? toProject(data as ProjectRow) : undefined;
}

function values(input: ProjectInput, slug: string) {
  return {
    slug, title: input.title.trim(), description: input.description.trim(),
    long_description: input.longDescription?.trim() || null, image: input.image?.trim() || null,
    video: input.video?.trim() || null, category: input.category.trim(), year: input.year.trim(),
    technologies: input.technologies, live_url: input.liveUrl?.trim() || null,
    featured: Boolean(input.featured), updated_at: new Date().toISOString(),
  };
}

export async function createProject(input: ProjectInput) {
  const slug = makeSlug(input.slug || input.title);
  if (!slug) throw new Error("Project title or slug is unavailable.");
  const { error } = await createSupabaseAdmin().from("projects").insert(values(input, slug));
  if (error?.code === "23505") throw new Error("Project title or slug is unavailable.");
  throwError(error);
  return slug;
}

export async function updateProject(oldSlug: string, input: ProjectInput) {
  const slug = makeSlug(input.slug || input.title);
  if (!slug) throw new Error("Project title or slug is unavailable.");
  const { data, error } = await createSupabaseAdmin().from("projects").update(values(input, slug))
    .eq("slug", makeSlug(oldSlug)).select("slug");
  if (error?.code === "23505") throw new Error("Project title or slug is unavailable.");
  throwError(error);
  if (!data?.length) throw new Error("Project not found.");
  return slug;
}

export async function deleteProject(slug: string) {
  const { data, error } = await createSupabaseAdmin().from("projects").delete()
    .eq("slug", makeSlug(slug)).select("slug");
  throwError(error);
  if (!data?.length) throw new Error("Project not found.");
}
