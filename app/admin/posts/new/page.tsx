import { requireAdmin } from "@/lib/admin-auth";
import AdminPostForm from "@/components/admin-post-form";
export default async function NewPostPage() { await requireAdmin(); return <AdminPostForm />; }
