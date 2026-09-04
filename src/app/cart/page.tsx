"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatPriceMAD } from "@/lib/types";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display mb-8 text-3xl text-brown-900">سلة التسوق</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-brown-800">سلتك فارغة حاليًا.</p>
          <Link
            href="/products"
            className="rounded-full bg-clay-500 px-6 py-2.5 text-sm font-medium text-cream hover:bg-clay-600"
          >
            تصفّحي المنتجات
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-cream">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-display text-lg text-brown-900 hover:text-clay-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-brown-800">
                      {formatPriceMAD(item.price)} للقطعة
                      {(item.color || item.size) && (
                        <span>
                          {" "}
                          — {[item.color, item.size].filter(Boolean).join(" / ")}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-sand-200 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="h-7 w-7 rounded-full text-brown-900 hover:bg-sand-100"
                      aria-label="إنقاص الكمية"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="h-7 w-7 rounded-full text-brown-900 hover:bg-sand-100"
                      aria-label="زيادة الكمية"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-24 text-end font-semibold text-rust-700">
                    {formatPriceMAD(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="text-sm text-maroon-700 hover:underline"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-end gap-4 rounded-2xl border border-sand-200 bg-cream p-6">
            <div className="flex w-full items-center justify-between text-lg">
              <span className="font-medium text-brown-900">المجموع</span>
              <span className="font-semibold text-rust-700">{formatPriceMAD(totalPrice)}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full rounded-full bg-brown-900 px-6 py-3 text-center text-sm font-medium text-cream hover:bg-clay-600 sm:w-fit"
            >
              متابعة الشراء
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
