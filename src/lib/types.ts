import type { Tables } from "@/lib/supabase/helpers";

export type Product = Tables<"products">;
export type Category = Tables<"categories">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type Coupon = Tables<"coupons">;
export type Profile = Tables<"profiles">;

export function formatPriceMAD(price: number): string {
  return `${price.toLocaleString("ar-MA")} درهم`;
}
