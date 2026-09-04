import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getStoreBranding } from "@/lib/store-branding";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const branding = await getStoreBranding();

  return (
    <CartProvider>
      {branding.bannerText && (
        <div className="bg-brown-900 px-4 py-2 text-center text-xs text-cream sm:text-sm">
          {branding.bannerText}
        </div>
      )}
      <Header storeName={branding.name} logoUrl={branding.logoUrl} />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer storeName={branding.name} storeNameAr={branding.nameAr} logoUrl={branding.logoUrl} />
    </CartProvider>
  );
}
