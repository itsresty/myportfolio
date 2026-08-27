import AdminProjectForm from "@/components/admin-project-form";
import { requireAdmin } from "@/lib/admin-auth";

export default async function NewProjectPage() {
  await requireAdmin();
  return <AdminProjectForm />;
}
