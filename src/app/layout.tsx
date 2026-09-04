import type { Metadata } from "next";
import { Cairo, Reem_Kufi } from "next/font/google";
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
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/logo.png"],
  },
  alternates: { canonical: STORE.siteUrl },
};

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
