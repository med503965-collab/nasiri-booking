"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function WishlistButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!active) return;
      setUserId(data.user?.id ?? null);

      if (data.user) {
        const { data: row } = await supabase
          .from("wishlists")
          .select("id")
          .eq("product_id", productId)
          .eq("customer_id", data.user.id)
          .maybeSingle();
        if (active) setInWishlist(!!row);
      }
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [productId]);

  const toggle = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }
    const supabase = createClient();
    if (inWishlist) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("product_id", productId)
        .eq("customer_id", userId);
      setInWishlist(false);
    } else {
      await supabase.from("wishlists").insert({ product_id: productId, customer_id: userId });
      setInWishlist(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className="rounded-full border border-sand-200 px-5 py-2.5 text-sm font-medium text-brown-900 transition-colors hover:border-clay-400 disabled:opacity-50"
    >
      {inWishlist ? "♥ في المفضلة" : "♡ أضيفي للمفضلة"}
    </button>
  );
}
