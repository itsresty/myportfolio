import { unstable_noStore as noStore } from "next/cache";

import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabasePublic } from "@/lib/supabase/public";

export const SKILL_CATEGORIES = [
  "Development",
  "UI & Design",
  "Video & Content",
  "Digital Support",
  "Workflow & Productivity",
  "Currently Learning",
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  sortOrder: number;
};

type SkillRow = {
  id: string;
  name: string;
  category: SkillCategory;
  sort_order: number;
};

function toSkill(row: SkillRow): Skill {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    sortOrder: row.sort_order,
  };
}

export async function getAllSkills(): Promise<Skill[]> {
  noStore();
  try {
    const { data, error } = await createSupabasePublic()
      .from("about_skills")
      .select("id, name, category, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) throw new Error(error.message);

    return ((data ?? []) as SkillRow[]).map(toSkill);
  } catch (error) {
    console.error("Supabase skill read failed:", error);
    return [];
  }
}

function validate(input: Pick<Skill, "name" | "category" | "sortOrder">) {
  const name = input.name.trim();
  if (!name) throw new Error("Skill name is required.");
  if (!SKILL_CATEGORIES.includes(input.category)) {
    throw new Error("Choose a valid skill category.");
  }
  return { name, category: input.category, sort_order: input.sortOrder };
}

export async function createSkill(input: Pick<Skill, "name" | "category" | "sortOrder">) {
  const { error } = await createSupabaseAdmin()
    .from("about_skills")
    .insert(validate(input));
  if (error?.code === "23505") throw new Error("That skill already exists in this category.");
  if (error) throw new Error(error.message);
}

export async function updateSkill(id: string, input: Pick<Skill, "name" | "category" | "sortOrder">) {
  const { error } = await createSupabaseAdmin()
    .from("about_skills")
    .update({ ...validate(input), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error?.code === "23505") throw new Error("That skill already exists in this category.");
  if (error) throw new Error(error.message);
}

export async function deleteSkill(id: string) {
  const { error } = await createSupabaseAdmin().from("about_skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
