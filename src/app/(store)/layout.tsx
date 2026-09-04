import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("store_settings")
    .select("banner_text")
    .eq("id", true)
    .maybeSingle();

  return (
    <CartProvider>
      {settings?.banner_text && (
        <div className="bg-brown-900 px-4 py-2 text-center text-xs text-cream sm:text-sm">
          {settings.banner_text}
        </div>
      )}
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </CartProvider>
  );
}
