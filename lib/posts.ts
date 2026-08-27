import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabasePublic } from "@/lib/supabase/public";
import { deletePortfolioFile, uploadPortfolioFile } from "@/lib/supabase/storage";

export type PostStatus = "draft" | "published";
export type Post = { slug: string; title: string; subheading?: string; author?: string; date: string; image?: string; video?: string; status?: PostStatus; body?: string };
export type PostInput = Omit<Post, "slug" | "body"> & { body: string; slug?: string };

type PostRow = { slug: string; title: string; subheading: string | null; author: string | null; date: string; image: string | null; video: string | null; status: PostStatus; body: string };

export function makeSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function toPost(row: PostRow): Post {
  return { slug: row.slug, title: row.title, subheading: row.subheading ?? undefined, author: row.author ?? undefined, date: row.date, image: row.image ?? undefined, video: row.video ?? undefined, status: row.status, body: row.body };
}

function legacyPosts(includeDrafts: boolean): Post[] {
  try {
    const dir = path.join(process.cwd(), "content", "blog");
    return fs.readdirSync(dir).filter((file) => /\.(md|mdx)$/.test(file)).map((file) => {
      const source = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(source);
      return {
        slug: file.replace(/\.(md|mdx)$/, ""), title: String(data.title ?? ""),
        subheading: data.subheading ? String(data.subheading) : undefined,
        author: data.author ? String(data.author) : undefined, date: String(data.date ?? ""),
        image: data.image ? String(data.image) : undefined, video: data.video ? String(data.video) : undefined,
        status: data.status === "published" ? "published" : "draft", body: content.trim(),
      } as Post;
    }).filter((post) => includeDrafts || post.status === "published")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch { return []; }
}

export async function getAllPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}): Promise<Post[]> {
  try {
    const client = includeDrafts ? createSupabaseAdmin() : createSupabasePublic();
    let query = client.from("posts").select("slug,title,subheading,author,date,image,video,status,body").order("date", { ascending: false });
    if (!includeDrafts) query = query.eq("status", "published");
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return ((data ?? []) as PostRow[]).map(toPost);
  } catch (error) {
    console.error("Supabase post read failed; using bundled post data:", error);
    return legacyPosts(includeDrafts);
  }
}

export async function getPostBySlug(slug: string, { includeDrafts = false }: { includeDrafts?: boolean } = {}): Promise<Post | null> {
  const safeSlug = makeSlug(slug);
  if (!safeSlug) return null;
  try {
    const client = includeDrafts ? createSupabaseAdmin() : createSupabasePublic();
    let query = client.from("posts").select("slug,title,subheading,author,date,image,video,status,body").eq("slug", safeSlug);
    if (!includeDrafts) query = query.eq("status", "published");
    const { data, error } = await query.maybeSingle();
    if (error) throw new Error(error.message);
    return data ? toPost(data as PostRow) : null;
  } catch (error) {
    console.error("Supabase post read failed; using bundled post data:", error);
    return legacyPosts(includeDrafts).find((post) => post.slug === safeSlug) ?? null;
  }
}

export async function getRecentPosts(count = 3): Promise<Post[]> { return (await getAllPosts()).slice(0, count); }
export async function getAllSlugs(): Promise<string[]> { return (await getAllPosts()).map((post) => post.slug); }

function values(input: PostInput, slug: string) {
  const title = input.title.trim(); const body = input.body.trim();
  if (!title) throw new Error("Post title is required.");
  if (!body) throw new Error("Post content is required.");
  if (!input.date) throw new Error("Post date is required.");
  return {
    slug, title, body, date: input.date, author: input.author?.trim() || "Resty Montero",
    subheading: input.subheading?.trim() || null, image: input.image?.trim() || null,
    video: input.video?.trim() || null, status: input.status === "published" ? "published" : "draft",
    updated_at: new Date().toISOString(),
  };
}

export async function savePostImage(file: File): Promise<string> {
  if (!file || file.size === 0) throw new Error("No image was selected.");
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) throw new Error("Only JPG, PNG, WEBP, and GIF images are allowed.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be smaller than 5MB.");
  return uploadPortfolioFile(file, "posts");
}

export async function deletePostImage(imagePath?: string) { await deletePortfolioFile(imagePath); }

export async function createPost(input: PostInput) {
  const slug = makeSlug(input.slug || input.title);
  if (!slug) throw new Error("A title or slug is required.");
  const { error } = await createSupabaseAdmin().from("posts").insert(values(input, slug));
  if (error?.code === "23505") throw new Error("A post with this slug already exists.");
  if (error) throw new Error(error.message);
  return slug;
}

export async function updatePost(previousSlug: string, input: PostInput) {
  const slug = makeSlug(input.slug || input.title);
  if (!slug) throw new Error("A title or slug is required.");
  const { data, error } = await createSupabaseAdmin().from("posts").update(values(input, slug)).eq("slug", makeSlug(previousSlug)).select("slug");
  if (error?.code === "23505") throw new Error("A post with this slug already exists.");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Post not found.");
  return slug;
}

export async function deletePost(slug: string) {
  const post = await getPostBySlug(slug, { includeDrafts: true });
  if (!post) throw new Error("Post not found.");
  const { error } = await createSupabaseAdmin().from("posts").delete().eq("slug", makeSlug(slug));
  if (error) throw new Error(error.message);
  await deletePortfolioFile(post.image);
  await deletePortfolioFile(post.video);
}
