import { createClient } from "@/lib/supabase/server";
import { STORE } from "@/lib/store-config";

export interface SocialLinks {
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  snapchat: string | null;
}

export interface StoreBranding {
  name: string;
  nameAr: string;
  logoUrl: string;
  bannerText: string | null;
  whatsappNumber: string;
  social: SocialLinks;
}

export async function getStoreBranding(): Promise<StoreBranding> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("store_settings")
    .select(
      "store_name, store_name_ar, logo_url, banner_text, whatsapp_number, instagram_url, facebook_url, tiktok_url, snapchat_url",
    )
    .eq("id", true)
    .maybeSingle();

  return {
    name: data?.store_name || STORE.name,
    nameAr: data?.store_name_ar || STORE.nameAr,
    logoUrl: data?.logo_url || "/logo.png",
    bannerText: data?.banner_text ?? null,
    whatsappNumber: data?.whatsapp_number || STORE.whatsappNumber,
    social: {
      instagram: data?.instagram_url || null,
      facebook: data?.facebook_url || null,
      tiktok: data?.tiktok_url || null,
      snapchat: data?.snapchat_url || null,
    },
  };
}
