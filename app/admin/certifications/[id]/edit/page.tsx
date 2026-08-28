import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getCertificationById } from "@/lib/certifications";
import AdminCertificationForm from "@/components/admin-certification-form";
export default async function EditCertificationPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) { await requireAdmin(); const [{ id }, { error }] = await Promise.all([params, searchParams]); const certification = await getCertificationById(id); if (!certification) notFound(); return <AdminCertificationForm certification={certification} error={error} />; }
