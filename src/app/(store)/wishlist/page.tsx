import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export const metadata = { title: "المفضلة | AYOUNA — أيونا" };

export default async function WishlistPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/wishlist");
  }

  const { data } = await supabase
    .from("wishlists")
    .select("products(*)")
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  const products = (data ?? [])
    .map((row) => row.products)
    .filter((product): product is Product => product !== null);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="font-display mb-8 text-3xl text-brown-900">المفضلة</h1>

      {products.length === 0 ? (
        <p className="text-brown-800">لم تُضيفي أي منتج إلى المفضلة بعد.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
