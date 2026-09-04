import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getProducts } from "@/lib/products";
import { formatPriceMAD } from "@/lib/types";

export async function generateMetadata(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} | AYOUNA — أيونا` : "المنتج غير موجود" };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sameCategory = await getProducts({ category: product.category });
  const relatedProducts = sameCategory
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <nav className="mb-8 text-sm text-brown-800">
        <Link href="/products" className="hover:text-clay-600">
          المنتجات
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductImage
          images={product.images}
          name={product.name}
          className="aspect-square w-full rounded-2xl"
          sizes="(min-width: 768px) 50vw, 100vw"
        />

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-clay-600">{product.category}</span>
          <h1 className="font-display text-3xl text-brown-900">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-rust-700">
              {formatPriceMAD(product.price)}
            </span>
            {product.old_price && (
              <span className="text-lg text-brown-800/60 line-through">
                {formatPriceMAD(product.old_price)}
              </span>
            )}
          </div>
          {product.description && (
            <p className="leading-relaxed text-brown-800">{product.description}</p>
          )}
          <ProductPurchasePanel product={product} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display mb-6 text-2xl text-brown-900">قد يعجبكِ أيضًا</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
