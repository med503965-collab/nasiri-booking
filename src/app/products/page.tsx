import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/products";

export const metadata = {
  title: "المنتجات | AYOUNA — أيونا",
};

export default async function ProductsPage(props: PageProps<"/products">) {
  const { category, q } = await props.searchParams;
  const activeCategory = typeof category === "string" ? category : undefined;
  const search = typeof q === "string" ? q : undefined;

  const [products, categories] = await Promise.all([
    getProducts({ category: activeCategory, search }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="font-display mb-2 text-3xl text-brown-900">المنتجات</h1>
      <p className="mb-8 text-brown-800">
        اكتشفي تشكيلة أيونا من الفساتين والعبايات والحقائب والإكسسوارات.
      </p>

      <form className="mb-6 flex gap-2" action="/products">
        {activeCategory && (
          <input type="hidden" name="category" value={activeCategory} />
        )}
        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="ابحثي عن منتج..."
          className="w-full max-w-sm rounded-full border border-sand-200 bg-cream px-4 py-2.5 text-brown-900 outline-none focus:border-clay-400"
        />
        <button
          type="submit"
          className="rounded-full bg-brown-900 px-5 py-2.5 text-sm font-medium text-cream hover:bg-clay-600"
        >
          بحث
        </button>
      </form>

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
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${encodeURIComponent(cat.slug)}`}
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
        <p className="text-brown-800">لا توجد منتجات مطابقة حاليًا.</p>
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
