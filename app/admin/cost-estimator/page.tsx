import { requireAdmin } from "@/lib/admin-auth";
import CostEstimator from "@/components/cost-estimator";

export default async function AdminCostEstimatorPage() {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pt-12">
      <header className="mb-10 flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Admin</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Project Cost Estimator
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Build a complete estimate with services, features, scope complexity,
            delivery terms, payment milestones, and a client-ready PDF quotation.
          </p>
        </div>
      </header>

      <CostEstimator />
    </div>
  );
}
