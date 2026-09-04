import Link from "next/link";
import { Logo } from "@/components/Logo";
import { STORE } from "@/lib/store-config";

export function Footer({
  storeName,
  storeNameAr,
  logoUrl,
}: {
  storeName: string;
  storeNameAr: string;
  logoUrl: string;
}) {
  return (
    <footer className="mt-24 border-t border-sand-200 bg-brown-900 text-sand-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7" src={logoUrl} />
            <span className="font-display text-xl text-cream">{storeName}</span>
          </div>
          <p className="max-w-xs text-sm text-sand-200">{STORE.slogan}</p>
          <p className="text-sm text-sand-300">{STORE.city}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-cream">روابط سريعة</span>
          <Link href="/products" className="text-sand-200 hover:text-gold-400">
            المنتجات
          </Link>
          <Link href="/about" className="text-sand-200 hover:text-gold-400">
            من نحن
          </Link>
          <Link href="/contact" className="text-sand-200 hover:text-gold-400">
            تواصل معنا
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-cream">معلومات</span>
          <span className="text-sand-200">الدفع والتوصيل داخل المغرب</span>
          <span className="text-sand-200">الأسعار بالدرهم المغربي (MAD)</span>
        </div>
      </div>
      <div className="border-t border-brown-800 px-6 py-4 text-center text-xs text-sand-300">
        © {new Date().getFullYear()} {storeName} — {storeNameAr}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
