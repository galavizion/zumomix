import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

export interface SiteSettings {
  site_title: string;
  site_description: string;
  logo_url: string;
  logo_text: string;
  favicon_url: string;
  google_analytics_id: string;
  google_ads_id: string;
  google_search_console: string;
  meta_pixel_id: string;
  tiktok_pixel_id: string;
  custom_head_scripts: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  site_title: "Zumomix - Exprimidores y dispensadores para tu negocio",
  site_description:
    "Equipos profesionales de extracción de jugos naturales. Venta, renta y soporte técnico en toda la República Mexicana.",
  logo_url: "",
  logo_text: "zumomix",
  favicon_url: "",
  google_analytics_id: "",
  google_ads_id: "",
  google_search_console: "",
  meta_pixel_id: "",
  tiktok_pixel_id: "",
  custom_head_scripts: "",
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("site_settings")
      .select("key, value");
    if (!data) return DEFAULT_SETTINGS;
    const map: Record<string, string> = {};
    data.forEach((row: { key: string; value: string }) => {
      map[row.key] = row.value ?? "";
    });
    return { ...DEFAULT_SETTINGS, ...map };
  } catch {
    return DEFAULT_SETTINGS;
  }
});
