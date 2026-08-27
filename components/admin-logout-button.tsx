"use client";

import { logoutAction } from "@/app/admin/actions";

export default function AdminLogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
      >
        Sign out
      </button>
    </form>
  );
}