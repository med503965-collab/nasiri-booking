"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WishlistButton } from "@/components/WishlistButton";
import type { Product } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [color, setColor] = useState<string | null>(product.colors[0] ?? null);
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const outOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col gap-4">
      {product.colors.length > 0 && (
        <div>
          <span className="mb-2 block text-sm font-medium text-brown-900">اللون</span>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  color === c
                    ? "border-brown-900 bg-brown-900 text-cream"
                    : "border-sand-200 text-brown-800 hover:border-clay-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <span className="mb-2 block text-sm font-medium text-brown-900">المقاس</span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  size === s
                    ? "border-brown-900 bg-brown-900 text-cream"
                    : "border-sand-200 text-brown-800 hover:border-clay-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <AddToCartButton
          product={product}
          color={color}
          size={size}
          disabled={outOfStock}
          className="w-full sm:w-fit"
        />
        <WishlistButton productId={product.id} />
      </div>

      {outOfStock && (
        <p className="text-sm text-maroon-700">هذا المنتج غير متوفر حاليًا في المخزون.</p>
      )}
    </div>
  );
}
