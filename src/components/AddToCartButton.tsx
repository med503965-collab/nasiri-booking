"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  color,
  size,
  disabled,
  className = "",
}: {
  product: Product;
  quantity?: number;
  color?: string | null;
  size?: string | null;
  disabled?: boolean;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        addItem(product, quantity, { color, size });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`rounded-full bg-clay-500 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clay-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {disabled ? "غير متوفر حاليًا" : added ? "أُضيف إلى السلة ✓" : "أضيفي إلى السلة"}
    </button>
  );
}
