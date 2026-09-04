import { createClient } from "@/lib/supabase/server";
import type { Category, Product } from "@/lib/types";

export async function getProducts(options?: {
  category?: string;
  search?: string;
}): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.search) {
    query = query.ilike("name", `%${options.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export function getCategoryName(categories: Category[], slug: string): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}
