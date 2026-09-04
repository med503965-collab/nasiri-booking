const PLACEHOLDER_PRODUCTS = [
  { id: 1, name: "Product One", price: "$0.00" },
  { id: 2, name: "Product Two", price: "$0.00" },
  { id: 3, name: "Product Three", price: "$0.00" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="border-b border-black/[.08] px-6 py-5 dark:border-white/[.145]">
        <h1 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Ayouna
        </h1>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <section className="flex flex-col items-start gap-4 pb-16">
          <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            Welcome to Ayouna
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Your store, coming soon. Browse our products below.
          </p>
        </section>

        <section>
          <h3 className="mb-6 text-lg font-medium text-black dark:text-zinc-50">
            Products
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {PLACEHOLDER_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-2 rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]"
              >
                <div className="aspect-square w-full rounded-md bg-black/[.04] dark:bg-white/[.06]" />
                <span className="font-medium text-black dark:text-zinc-50">
                  {product.name}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {product.price}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[.08] px-6 py-5 text-sm text-zinc-600 dark:border-white/[.145] dark:text-zinc-400">
        © {new Date().getFullYear()} Ayouna
      </footer>
    </div>
  );
}
