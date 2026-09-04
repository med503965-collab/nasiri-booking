import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/products";
import { STORE } from "@/lib/store-config";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <section className="bg-desert-gradient relative overflow-hidden">
        <div className="bg-dune-pattern absolute inset-0 opacity-10" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
          <span className="text-sm font-medium tracking-[0.3em] text-brown-800 uppercase">
            {STORE.name} — {STORE.nameAr}
          </span>
          <h1 className="font-display max-w-2xl text-4xl leading-tight text-brown-900 sm:text-5xl">
            {STORE.slogan}
          </h1>
          <p className="max-w-xl text-lg text-brown-800">
            متجر إلكتروني للملابس والمنتجات النسائية، بتصميم فاخر عصري مستوحى
            من ألوان الصحراء ولمسة مغربية أصيلة، من قلب {STORE.city}.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="rounded-full bg-brown-900 px-8 py-3 text-sm font-medium text-cream transition-colors hover:bg-clay-600"
            >
              تسوقي المجموعة
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-brown-900 px-8 py-3 text-sm font-medium text-brown-900 transition-colors hover:bg-cream/60"
            >
              تعرّفي على أيونا
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="font-display mb-8 text-center text-2xl text-brown-900">
          تسوّقي حسب الفئة
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-sand-200 bg-cream px-4 py-8 text-center transition-shadow hover:shadow-md"
            >
              <span className="font-display text-lg text-brown-900">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl text-brown-900">
            الأكثر تميزًا
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-clay-600 hover:text-clay-500"
          >
            عرض الكل ←
          </Link>
        </div>
        {featuredProducts.length === 0 ? (
          <p className="text-brown-800">لا توجد منتجات متاحة حاليًا.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-brown-900 py-16 text-cream">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
          <h2 className="font-display text-2xl">قصة أيونا</h2>
          <p className="max-w-2xl text-sand-100">
            وُلدت {STORE.nameAr} من قلب {STORE.city}، حيث تلتقي رمال الصحراء
            الذهبية بأمواج المحيط الأطلسي. نصمم قطعًا نسائية تعكس أناقة
            المرأة المغربية الأصيلة بلمسة عصرية فاخرة، لتحملي معكِ دفء
            الصحراء أينما ذهبتِ.
          </p>
        </div>
      </section>
    </>
  );
}
