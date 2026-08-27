"use client";

import { useRef } from "react";
import {
  CheckCircle2,
  CircleSlash,
} from "lucide-react";

import {
  updateAvailabilityAction,
} from "@/app/admin/actions";

type AdminAvailabilityToggleProps = {
  availableForWork: boolean;
};

export default function AdminAvailabilityToggle({
  availableForWork,
}: AdminAvailabilityToggleProps) {
  const formRef =
    useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={updateAvailabilityAction}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`rounded-xl p-3 ${
              availableForWork
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {availableForWork ? (
              <CheckCircle2 size={20} />
            ) : (
              <CircleSlash size={20} />
            )}
          </span>

          <div>
            <h2 className="text-lg font-bold">
              Availability
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {availableForWork
                ? "You are showing as available for work."
                : "You are showing as currently unavailable."}
            </p>
          </div>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            name="availableForWork"
            defaultChecked={
              availableForWork
            }
            onChange={() =>
              formRef.current?.requestSubmit()
            }
            className="peer sr-only"
          />

          <span className="h-8 w-14 rounded-full bg-slate-200 transition-colors peer-checked:bg-emerald-500" />

          <span className="absolute left-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-6" />
        </label>
      </div>
    </form>
  );
}