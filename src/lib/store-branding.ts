import { createClient } from "@/lib/supabase/server";
import { STORE } from "@/lib/store-config";

export interface StoreBranding {
  name: string;
  nameAr: string;
  logoUrl: string;
  bannerText: string | null;
}

export async function getStoreBranding(): Promise<StoreBranding> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("store_settings")
    .select("store_name, store_name_ar, logo_url, banner_text")
    .eq("id", true)
    .maybeSingle();

  return {
    name: data?.store_name || STORE.name,
    nameAr: data?.store_name_ar || STORE.nameAr,
    logoUrl: data?.logo_url || "/logo.png",
    bannerText: data?.banner_text ?? null,
  };
}
