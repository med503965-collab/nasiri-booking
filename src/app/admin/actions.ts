"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";

function slugify(name: string, id: string) {
  return `${name.trim().replace(/\s+/g, "-")}-${id.slice(0, 6)}`;
}

function toStringArray(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function createProduct(formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price"));
  const oldPriceRaw = formData.get("old_price");
  const stock = Number(formData.get("stock") ?? 0);
  const description = String(formData.get("description") ?? "").trim() || null;
  const sku = String(formData.get("sku") ?? "").trim() || null;
  const badge = String(formData.get("badge") ?? "").trim() || null;
  const colors = toStringArray(formData.get("colors"));
  const sizes = toStringArray(formData.get("sizes"));
  const images = toStringArray(formData.get("images"));

  if (!name || !category || Number.isNaN(price)) {
    throw new Error("بيانات المنتج غير مكتملة");
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      category,
      price,
      old_price: oldPriceRaw ? Number(oldPriceRaw) : null,
      stock: Number.isNaN(stock) ? 0 : stock,
      description,
      sku,
      badge: badge || null,
      colors,
      sizes,
      images,
      slug: "",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  await supabase
    .from("products")
    .update({ slug: slugify(name, data.id) })
    .eq("id", data.id);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price"));
  const oldPriceRaw = formData.get("old_price");
  const stock = Number(formData.get("stock") ?? 0);
  const description = String(formData.get("description") ?? "").trim() || null;
  const sku = String(formData.get("sku") ?? "").trim() || null;
  const badge = String(formData.get("badge") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "active");
  const colors = toStringArray(formData.get("colors"));
  const sizes = toStringArray(formData.get("sizes"));
  const images = toStringArray(formData.get("images"));

  const { error } = await supabase
    .from("products")
    .update({
      name,
      category,
      price,
      old_price: oldPriceRaw ? Number(oldPriceRaw) : null,
      stock: Number.isNaN(stock) ? 0 : stock,
      description,
      sku,
      badge: badge || null,
      status,
      colors,
      sizes,
      images,
    })
    .eq("id", productId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function createCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || name;
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!name) throw new Error("اسم الفئة مطلوب");

  const { error } = await supabase
    .from("categories")
    .insert({ name, slug, sort_order: Number.isNaN(sortOrder) ? 0 : sortOrder });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function deleteCategory(categoryId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("categories").delete().eq("id", categoryId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function createCoupon(formData: FormData) {
  const { supabase } = await requireAdmin();
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const discountPercent = Number(formData.get("discount_percent"));
  const minOrder = Number(formData.get("min_order") ?? 0);
  const usageLimitRaw = formData.get("usage_limit");
  const startDate = String(formData.get("start_date") ?? "") || null;
  const endDate = String(formData.get("end_date") ?? "") || null;

  if (!code || Number.isNaN(discountPercent)) {
    throw new Error("بيانات الكوبون غير صحيحة");
  }

  const { error } = await supabase.from("coupons").insert({
    code,
    discount_percent: discountPercent,
    min_order: Number.isNaN(minOrder) ? 0 : minOrder,
    usage_limit: usageLimitRaw ? Number(usageLimitRaw) : null,
    start_date: startDate,
    end_date: endDate,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/coupons");
}

export async function deleteCoupon(couponId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("coupons").delete().eq("id", couponId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/coupons");
}

export async function updateStoreSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const bannerText = String(formData.get("banner_text") ?? "").trim() || null;
  const contactPhone = String(formData.get("contact_phone") ?? "").trim() || null;
  const deliveryFee = Number(formData.get("delivery_fee") ?? 0);

  const { error } = await supabase
    .from("store_settings")
    .update({
      banner_text: bannerText,
      contact_phone: contactPhone,
      delivery_fee: Number.isNaN(deliveryFee) ? 0 : deliveryFee,
    })
    .eq("id", true);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function updateStoreContact(formData: FormData) {
  const { supabase } = await requireAdmin();
  const whatsappNumber = String(formData.get("whatsapp_number") ?? "").trim() || null;
  const instagramUrl = String(formData.get("instagram_url") ?? "").trim() || null;
  const facebookUrl = String(formData.get("facebook_url") ?? "").trim() || null;
  const tiktokUrl = String(formData.get("tiktok_url") ?? "").trim() || null;
  const snapchatUrl = String(formData.get("snapchat_url") ?? "").trim() || null;

  const { error } = await supabase
    .from("store_settings")
    .update({
      whatsapp_number: whatsappNumber,
      instagram_url: instagramUrl,
      facebook_url: facebookUrl,
      tiktok_url: tiktokUrl,
      snapchat_url: snapchatUrl,
    })
    .eq("id", true);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}

export async function updateStoreBranding(formData: FormData) {
  const { supabase } = await requireAdmin();
  const storeName = String(formData.get("store_name") ?? "").trim() || "AYOUNA";
  const storeNameAr = String(formData.get("store_name_ar") ?? "").trim() || "أيونا";
  const logoUrl = String(formData.get("logo_url") ?? "").trim() || "/logo.png";

  const { error } = await supabase
    .from("store_settings")
    .update({
      store_name: storeName,
      store_name_ar: storeNameAr,
      logo_url: logoUrl === "/logo.png" ? null : logoUrl,
    })
    .eq("id", true);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}
