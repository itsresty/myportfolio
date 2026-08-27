import AdminAvailabilityToggle from "@/components/admin-availability-toggle";
import { requireAdmin } from "@/lib/admin-auth";
import { getSiteSettings } from "@/lib/site-settings";
import { LockKeyhole, UserRound } from "lucide-react";

type AdminSettingsPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminSettingsPage({
  searchParams,
}: AdminSettingsPageProps) {
  await requireAdmin();

  const {
    availableForWork,
  } = await getSiteSettings();

  const { saved } =
    await searchParams;
  const adminUsername =
    process.env.ADMIN_USERNAME ?? "Not configured";

  return (
    <div className="mx-auto max-w-4xl px-5 pb-12 pt-20 sm:px-8 lg:pt-10">
      <header className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Admin controls
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your portfolio availability and other settings.
        </p>
      </header>

      {saved === "availability" && (
        <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Availability updated successfully.
        </p>
      )}

      <AdminAvailabilityToggle
        availableForWork={
          availableForWork
        }
      />

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-950">Admin account</h2>
          <p className="mt-1 text-sm text-slate-500">Your sign-in details are managed securely on this server.</p>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><UserRound size={18} /></span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Username</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-950">{adminUsername}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><LockKeyhole size={18} /></span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Password</p>
              <p className="mt-0.5 text-sm text-slate-600">Protected — passwords are not displayed for security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
