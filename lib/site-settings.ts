import fs from "fs";
import path from "path";

const SETTINGS_FILE = path.join(process.cwd(), "content", "settings.json");

export type BusinessProfile = {
  businessName: string;
  businessTagline: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessWebsite: string;
  businessTaxId: string;
};

export type SiteSettings = {
  availableForWork: boolean;
  businessProfile: BusinessProfile;
};

const defaultSettings: SiteSettings = {
  availableForWork: true,
  businessProfile: {
    businessName: "Resty Montero",
    businessTagline: "Full-Stack Development & Digital Services",
    businessEmail: "hello@restymontero.dev",
    businessPhone: "+34 600 000 000",
    businessAddress: "Madrid, Spain",
    businessWebsite: "https://restymontero.dev",
    businessTaxId: "",
  },
};

export function getBusinessProfile(): BusinessProfile {
  return getSiteSettings().businessProfile;
}

export function getSiteSettings(): SiteSettings {
  if (!fs.existsSync(SETTINGS_FILE)) return defaultSettings;

  try {
    const parsed = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));

    return {
      ...defaultSettings,
      ...parsed,
      businessProfile: {
        ...defaultSettings.businessProfile,
        ...(parsed.businessProfile ?? {}),
      },
    };
  } catch {
    return defaultSettings;
  }
}

export function updateSiteSettings(settings: Partial<SiteSettings>) {
  const current = getSiteSettings();

  const nextSettings: SiteSettings = {
    ...current,
    ...settings,
    businessProfile: {
      ...current.businessProfile,
      ...(settings.businessProfile ?? {}),
    },
  };

  fs.mkdirSync(path.dirname(SETTINGS_FILE), { recursive: true });
  fs.writeFileSync(SETTINGS_FILE, `${JSON.stringify(nextSettings, null, 2)}\n`, "utf8");

  return nextSettings;
}

export function updateBusinessProfile(profile: Partial<BusinessProfile>) {
  return updateSiteSettings({
    businessProfile: {
      ...getBusinessProfile(),
      ...profile,
    },
  });
}
