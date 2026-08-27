import AdminLoginForm from "@/components/admin-login-form";
import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  const { error, next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950 shadow-lg ring-1 ring-white/20">
            RM
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to securely manage your portfolio.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
          {error === "config" ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800">
              Admin credentials are not configured. Add the required values to
              <code className="mx-1 rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env.local</code>
              and restart the server.
            </div>
          ) : (
            <AdminLoginForm error={error} next={next} />
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Private administration area
        </p>
      </div>
    </main>
  );
}
