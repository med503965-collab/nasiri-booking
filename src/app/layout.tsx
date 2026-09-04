import type { Metadata } from "next";
import { Cairo, Reem_Kufi } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { STORE } from "@/lib/store-config";
import { createClient } from "@/lib/supabase/server";
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

const title = "AYOUNA | متجر الملابس والمنتجات النسائية في العيون";
const description = `AYOUNA — ${STORE.slogan}. متجر إلكتروني للملابس والمنتجات النسائية في العيون، المغرب.`;

export const metadata: Metadata = {
  metadataBase: new URL(STORE.siteUrl),
  title: { default: title, template: `%s | ${STORE.name}` },
  description,
  openGraph: {
    title,
    description,
    url: STORE.siteUrl,
    siteName: STORE.name,
    locale: "ar_MA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  alternates: { canonical: STORE.siteUrl },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("store_settings")
    .select("banner_text")
    .eq("id", true)
    .maybeSingle();

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${reemKufi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 font-sans text-brown-900">
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
      </body>
    </html>
  );
}
