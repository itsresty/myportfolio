import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";

import type { Certification } from "@/lib/certifications";
import { createCertificationAction, updateCertificationAction } from "@/app/admin/actions";

export default function AdminCertificationForm({ certification, error }: { certification?: Certification; error?: string }) {
  const action = certification ? updateCertificationAction.bind(null, certification.id) : createCertificationAction;
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pt-12">
      <Link href="/admin/certifications" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950"><ArrowLeft size={16} /> All certifications</Link>
      <header className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Credentials</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{certification ? "Edit certification" : "New certification"}</h1><p className="mt-2 text-sm text-slate-500">Upload a certificate preview and PDF, then publish it to your portfolio.</p></header>
      {error && <p className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>}
      <form action={action} encType="multipart/form-data" className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Certificate title<input required name="title" defaultValue={certification?.title} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-slate-950" /></label>
          <label className="text-sm font-medium text-slate-700">Issuer<input required name="issuer" defaultValue={certification?.issuer} placeholder="e.g. freeCodeCamp" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-slate-950" /></label>
        </div>
        <label className="block text-sm font-medium text-slate-700">Year<input required name="year" type="number" min="1900" max="2100" defaultValue={certification?.year ?? new Date().getFullYear()} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-slate-950" /></label>
        <section className="grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div><p className="text-sm font-semibold text-slate-900">Certificate image</p><p className="mt-1 text-xs leading-5 text-slate-500">JPG, PNG, WebP, or GIF, up to 5MB.</p><label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm font-medium text-slate-600 hover:border-slate-950"><Upload size={16} /> Upload image<input type="file" name="imageFile" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" /></label><input type="url" name="image" defaultValue={certification?.image} placeholder="Or paste image URL" className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950" /></div>
          <div><p className="text-sm font-semibold text-slate-900">Certificate PDF</p><p className="mt-1 text-xs leading-5 text-slate-500">PDF only, up to 10MB.</p><label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm font-medium text-slate-600 hover:border-slate-950"><Upload size={16} /> Upload PDF<input type="file" name="pdfFile" accept="application/pdf" className="hidden" /></label><input type="url" name="pdf" defaultValue={certification?.pdf} placeholder="Or paste PDF URL" className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-950" /></div>
        </section>
        <input type="hidden" name="currentImage" value={certification?.image ?? ""} /><input type="hidden" name="currentPdf" value={certification?.pdf ?? ""} />
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"><Save size={16} /> {certification ? "Save changes" : "Create certification"}</button>
      </form>
    </div>
  );
}
