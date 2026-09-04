import type { Metadata } from "next";
import { Cairo, Reem_Kufi } from "next/font/google";
import { STORE } from "@/lib/store-config";
import { getStoreBranding } from "@/lib/store-branding";
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

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getStoreBranding();
  const title = `${branding.name} | متجر الملابس والمنتجات النسائية في العيون`;
  const description = `${branding.name} — ${STORE.slogan}. متجر إلكتروني للملابس والمنتجات النسائية في العيون، المغرب.`;

  return {
    metadataBase: new URL(STORE.siteUrl),
    title: { default: title, template: `%s | ${branding.name}` },
    description,
    openGraph: {
      title,
      description,
      url: STORE.siteUrl,
      siteName: branding.name,
      locale: "ar_MA",
      type: "website",
      images: [branding.logoUrl],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [branding.logoUrl],
    },
    alternates: { canonical: STORE.siteUrl },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${reemKufi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 font-sans text-brown-900">
        {children}
      </body>
    </html>
  );
}
