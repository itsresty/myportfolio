import fs from "fs";
import path from "path";
import { makeSlug } from "@/lib/posts";

const PROJECTS_FILE = path.join(process.cwd(), "content", "projects.json");
export type Project = { slug: string; title: string; description: string; longDescription?: string; image?: string; video?: string; category: string; year: string; technologies: string[]; liveUrl?: string; featured?: boolean };
export type ProjectInput = Omit<Project, "slug"> & { slug?: string };
function readProjects(): Project[] { return JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf8")) as Project[]; }
function writeProjects(projects: Project[]) { fs.writeFileSync(PROJECTS_FILE, `${JSON.stringify(projects, null, 2)}\n`, "utf8"); }
export async function getAllProjects(): Promise<Project[]> { return readProjects(); }
export async function getRecentProjects(limit = 3): Promise<Project[]> { return readProjects().slice(0, limit); }
export async function getProjectBySlug(slug: string): Promise<Project | undefined> { return readProjects().find((project) => project.slug === slug); }
export function createProject(input: ProjectInput) { const projects = readProjects(); const slug = makeSlug(input.slug || input.title); if (!slug || projects.some((project) => project.slug === slug)) throw new Error("Project title or slug is unavailable."); projects.unshift({ ...input, slug }); writeProjects(projects); return slug; }
export function updateProject(oldSlug: string, input: ProjectInput) { const projects = readProjects(); const index = projects.findIndex((project) => project.slug === oldSlug); const slug = makeSlug(input.slug || input.title); if (index < 0 || !slug || (slug !== oldSlug && projects.some((project) => project.slug === slug))) throw new Error("Project title or slug is unavailable."); projects[index] = { ...input, slug }; writeProjects(projects); return slug; }
export function deleteProject(slug: string) { const projects = readProjects(); const next = projects.filter((project) => project.slug !== slug); if (next.length === projects.length) throw new Error("Project not found."); writeProjects(next); }
