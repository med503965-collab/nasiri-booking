"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/track", label: "تتبع الطلب" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Header({ storeName, logoUrl }: { storeName: string; logoUrl: string }) {
  const { totalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-sand-200 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-brown-900">
          <Logo className="h-8 w-8" src={logoUrl} />
          <span className="font-display text-2xl">{storeName}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brown-800 transition-colors hover:text-clay-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-1 rounded-full border border-sand-200 px-4 py-2 text-sm font-medium text-brown-900 transition-colors hover:border-clay-400"
          >
            سلتي
            {totalCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-500 px-1 text-xs text-cream">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-md p-2 text-brown-900 md:hidden"
            aria-label="فتح القائمة"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-sand-200 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-brown-800 hover:bg-sand-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
