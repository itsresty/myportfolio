export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  image: string;
  pdf: string;
};

const fallbackCertifications: Certification[] = [
  {
    id: "certificate-01",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: 2026,
    image: "/certifications/responsive-web-design.png",
    pdf: "/certifications/responsive-web-design.pdf",
  },

  {
    id: "certificate-02",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: 2026,
    image: "/certifications/javascript.png",
    pdf: "/certifications/javascript.pdf",
  },

  {
    id: "certificate-03",
    title: "TypeScript Development",
    issuer: "Your Certification Provider",
    year: 2026,
    image: "/certifications/typescript.png",
    pdf: "/certifications/typescript.pdf",
  },
];

type CertificationRow = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  image: string;
  pdf: string;
};

export type CertificationInput = Omit<Certification, "id">;

import { unstable_noStore as noStore } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabasePublic } from "@/lib/supabase/public";

function toCertification(row: CertificationRow): Certification {
  return row;
}

export async function getAllCertifications(): Promise<Certification[]> {
  noStore();
  try {
    const { data, error } = await createSupabasePublic()
      .from("certifications")
      .select("id, title, issuer, year, image, pdf")
      .order("year", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return ((data ?? []) as CertificationRow[]).map(toCertification);
  } catch (error) {
    console.error("Supabase certification read failed; using bundled data:", error);
    return fallbackCertifications;
  }
}

export async function getCertificationById(id: string) {
  return (await getAllCertifications()).find((certification) => certification.id === id);
}

function values(input: CertificationInput) {
  const title = input.title.trim();
  const issuer = input.issuer.trim();
  const year = Number(input.year);
  if (!title || !issuer || !input.image.trim() || !input.pdf.trim()) {
    throw new Error("Title, issuer, certificate image, and certificate file are required.");
  }
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    throw new Error("Enter a valid certification year.");
  }
  return { title, issuer, year, image: input.image.trim(), pdf: input.pdf.trim(), updated_at: new Date().toISOString() };
}

export async function createCertification(input: CertificationInput) {
  const { error } = await createSupabaseAdmin().from("certifications").insert(values(input));
  if (error) throw new Error(error.message);
}

export async function updateCertification(id: string, input: CertificationInput) {
  const { error } = await createSupabaseAdmin().from("certifications").update(values(input)).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteCertification(id: string) {
  const { error } = await createSupabaseAdmin().from("certifications").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
