import { requireAdmin } from "@/lib/admin-auth";
import AdminCertificationForm from "@/components/admin-certification-form";
export default async function NewCertificationPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) { await requireAdmin(); const { error } = await searchParams; return <AdminCertificationForm error={error} />; }
