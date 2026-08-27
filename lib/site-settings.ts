import fs from "fs";
import path from "path";

import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabasePublic } from "@/lib/supabase/public";

export type BusinessProfile = {
  businessName: string; businessTagline: string; businessEmail: string;
  businessPhone: string; businessAddress: string; businessWebsite: string; businessTaxId: string;
};

export type SiteSettings = { availableForWork: boolean; businessProfile: BusinessProfile };

const defaults: SiteSettings = {
  availableForWork: true,
  businessProfile: {
    businessName: "Resty Montero", businessTagline: "Full-Stack Development & Digital Services",
    businessEmail: "hello@restymontero.dev", businessPhone: "+34 600 000 000",
    businessAddress: "Madrid, Spain", businessWebsite: "https://restymontero.dev", businessTaxId: "",
  },
};

function merge(settings?: Partial<SiteSettings>): SiteSettings {
  return {
    ...defaults, ...settings,
    businessProfile: { ...defaults.businessProfile, ...(settings?.businessProfile ?? {}) },
  };
}

function legacySettings(): SiteSettings {
  try {
    return merge(JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "settings.json"), "utf8")));
  } catch {
    return defaults;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await createSupabasePublic().from("site_settings")
      .select("available_for_work,business_profile").eq("id", true).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return legacySettings();
    return merge({ availableForWork: data.available_for_work, businessProfile: data.business_profile });
  } catch (error) {
    console.error("Supabase settings read failed; using bundled settings:", error);
    return legacySettings();
  }
}

export async function getBusinessProfile(): Promise<BusinessProfile> {
  return (await getSiteSettings()).businessProfile;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>) {
  const current = await getSiteSettings();
  const next = merge({ ...current, ...settings, businessProfile: { ...current.businessProfile, ...(settings.businessProfile ?? {}) } });
  const { error } = await createSupabaseAdmin().from("site_settings").upsert({
    id: true, available_for_work: next.availableForWork, business_profile: next.businessProfile,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  return next;
}

export async function updateBusinessProfile(profile: Partial<BusinessProfile>) {
  return updateSiteSettings({ businessProfile: { ...(await getBusinessProfile()), ...profile } });
}
