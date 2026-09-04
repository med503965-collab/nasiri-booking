import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPriceMAD, type Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock <= 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-cream shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative">
        <ProductImage
          images={product.images}
          name={product.name}
          className="aspect-[4/5] w-full transition-transform group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 rounded-full bg-maroon-700 px-3 py-1 text-xs font-medium text-cream">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium tracking-wide text-clay-600">
          {product.category}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-lg text-brown-900">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-rust-700">
            {formatPriceMAD(product.price)}
          </span>
          {product.old_price && (
            <span className="text-sm text-brown-800/60 line-through">
              {formatPriceMAD(product.old_price)}
            </span>
          )}
        </div>
        <AddToCartButton product={product} disabled={outOfStock} className="mt-2 w-full" />
      </div>
    </div>
  );
}
