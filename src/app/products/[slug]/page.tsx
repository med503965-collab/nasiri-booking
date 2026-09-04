import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import {
  PRODUCTS,
  formatPriceMAD,
  getCategoryName,
  getProductBySlug,
} from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} | AYOUNA — أيونا` : "المنتج غير موجود" };
}

export default async function ProductPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  ).slice(0, 3);

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
          colorFrom={product.colorFrom}
          colorTo={product.colorTo}
          name={product.name}
          className="aspect-square w-full rounded-2xl"
        />

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-clay-600">
            {getCategoryName(product.category)}
          </span>
          <h1 className="font-display text-3xl text-brown-900">
            {product.name}
          </h1>
          <span className="text-2xl font-semibold text-rust-700">
            {formatPriceMAD(product.price)}
          </span>
          <p className="leading-relaxed text-brown-800">
            {product.description}
          </p>
          <AddToCartButton product={product} className="mt-4 w-full sm:w-fit" />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display mb-6 text-2xl text-brown-900">
            قد يعجبكِ أيضًا
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
