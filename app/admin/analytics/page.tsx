import { BarChart3, FileText, FolderKanban, Radio } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { getSiteSettings } from "@/lib/site-settings";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const posts = getAllPosts({ includeDrafts: true });
  const projects = await getAllProjects();
  const { availableForWork } = await getSiteSettings();
  const publishedPosts = posts.filter((post) => post.status !== "draft").length;

  const stats = [
    { label: "Projects", value: projects.length, icon: FolderKanban },
    { label: "Featured projects", value: projects.filter((project) => project.featured).length, icon: BarChart3 },
    { label: "Published posts", value: publishedPosts, icon: FileText },
    { label: "Availability", value: availableForWork ? "On" : "Off", icon: Radio },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 lg:pt-10">
      <header className="mb-8">
        <p className="text-sm font-medium text-slate-500">Workspace overview</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Analytics</h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <span className="text-sm font-medium text-slate-500">{label}</span>
              <span className="rounded-xl bg-slate-100 p-2.5 text-slate-700"><Icon size={18} /></span>
            </div>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold">Content health</h2>
        <div className="mt-5 space-y-4">
          <div><div className="mb-2 flex justify-between text-sm"><span>Published posts</span><span>{publishedPosts}/{posts.length || 1}</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-slate-950" style={{ width: `${Math.round((publishedPosts / Math.max(posts.length, 1)) * 100)}%` }} /></div></div>
          <div><div className="mb-2 flex justify-between text-sm"><span>Featured projects</span><span>{projects.filter((project) => project.featured).length}/{projects.length || 1}</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.round((projects.filter((project) => project.featured).length / Math.max(projects.length, 1)) * 100)}%` }} /></div></div>
        </div>
      </section>
    </div>
  );
}
