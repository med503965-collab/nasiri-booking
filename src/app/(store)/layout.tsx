import { CartProvider } from "@/components/CartProvider";
import { StoreSettingsProvider } from "@/components/StoreSettingsProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getStoreBranding } from "@/lib/store-branding";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const branding = await getStoreBranding();

  return (
    <StoreSettingsProvider value={branding}>
      <CartProvider>
        {branding.bannerText && (
          <div className="bg-brown-900 px-4 py-2 text-center text-xs text-cream sm:text-sm">
            {branding.bannerText}
          </div>
        )}
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </CartProvider>
    </StoreSettingsProvider>
  );
}
