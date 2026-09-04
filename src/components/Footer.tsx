"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useStoreSettings } from "@/components/StoreSettingsProvider";
import { STORE } from "@/lib/store-config";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M14 8.5h2V5.5h-2c-2 0-3.5 1.5-3.5 3.5v2H8v3h2.5V21h3v-7h2.3l.7-3h-3v-2c0-.5.5-.5.5-.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M14 4v10.5a2.5 2.5 0 1 1-2.5-2.5M14 4c.3 2 1.8 3.6 4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M12 4c2.5 0 4 1.8 4 4.2 0 1 0 2 .3 2.6.3.6 1 .9 1.7 1-.1.7-1 1.1-1.6 1.4.2.5.6.9.6 1.4-.7.3-1.4.2-2 .5-.4.7-1 1.4-3 1.4s-2.6-.7-3-1.4c-.6-.3-1.3-.2-2-.5 0-.5.4-.9.6-1.4-.6-.3-1.5-.7-1.6-1.4.7-.1 1.4-.4 1.7-1C8 10.2 8 9.2 8 8.2 8 5.8 9.5 4 12 4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const { name: storeName, nameAr: storeNameAr, logoUrl, social } = useStoreSettings();

  const socialLinks = [
    { url: social.instagram, label: "انستقرام", Icon: InstagramIcon },
    { url: social.facebook, label: "فيسبوك", Icon: FacebookIcon },
    { url: social.tiktok, label: "تيك توك", Icon: TiktokIcon },
    { url: social.snapchat, label: "سناب شات", Icon: SnapchatIcon },
  ].filter((item) => item.url);

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
          {socialLinks.length > 0 && (
            <div className="mt-1 flex items-center gap-3">
              {socialLinks.map(({ url, label, Icon }) => (
                <a
                  key={label}
                  href={url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-sand-200 hover:text-gold-400"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
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
