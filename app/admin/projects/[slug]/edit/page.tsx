import { notFound } from "next/navigation";
import AdminProjectForm from "@/components/admin-project-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getProjectBySlug } from "@/lib/projects";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <AdminProjectForm project={project} />;
}
