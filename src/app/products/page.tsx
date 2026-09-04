import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "المنتجات | AYOUNA — أيونا",
};

export default async function ProductsPage(props: PageProps<"/products">) {
  const { category } = await props.searchParams;
  const activeCategory = typeof category === "string" ? category : undefined;

  const products = activeCategory
    ? PRODUCTS.filter((product) => product.category === activeCategory)
    : PRODUCTS;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="font-display mb-2 text-3xl text-brown-900">المنتجات</h1>
      <p className="mb-8 text-brown-800">
        اكتشفي تشكيلة أيونا من الفساتين والقفاطين والحقائب والإكسسوارات.
      </p>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href="/products"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            !activeCategory
              ? "border-brown-900 bg-brown-900 text-cream"
              : "border-sand-200 text-brown-800 hover:border-clay-400"
          }`}
        >
          الكل
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? "border-brown-900 bg-brown-900 text-cream"
                : "border-sand-200 text-brown-800 hover:border-clay-400"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-brown-800">لا توجد منتجات في هذه الفئة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
