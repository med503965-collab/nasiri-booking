import type { Metadata } from "next";
import { Cairo, Reem_Kufi } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { STORE } from "@/lib/store-config";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  weight: "400",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: `${STORE.name} — ${STORE.nameAr} | ${STORE.slogan}`,
  description: `${STORE.nameAr} متجر إلكتروني للملابس والمنتجات النسائية من قلب ${STORE.city}. تسوقي أحدث الفساتين والقفاطين والحقائب والإكسسوارات بأسعار بالدرهم المغربي.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${reemKufi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 font-sans text-brown-900">
        <CartProvider>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
