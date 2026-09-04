import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPriceMAD, getCategoryName, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-cream shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <ProductImage
          colorFrom={product.colorFrom}
          colorTo={product.colorTo}
          name={product.name}
          className="aspect-[4/5] w-full transition-transform group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium tracking-wide text-clay-600">
          {getCategoryName(product.category)}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-lg text-brown-900">{product.name}</h3>
        </Link>
        <span className="text-base font-semibold text-rust-700">
          {formatPriceMAD(product.price)}
        </span>
        <AddToCartButton product={product} className="mt-2 w-full" />
      </div>
    </div>
  );
}
