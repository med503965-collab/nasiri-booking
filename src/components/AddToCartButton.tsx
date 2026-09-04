"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: {
  product: Product;
  quantity?: number;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`rounded-full bg-clay-500 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clay-600 ${className}`}
    >
      {added ? "أُضيف إلى السلة ✓" : "أضيفي إلى السلة"}
    </button>
  );
}
