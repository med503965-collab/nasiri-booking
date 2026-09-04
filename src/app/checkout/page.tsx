"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { createClient } from "@/lib/supabase/client";
import { formatPriceMAD } from "@/lib/types";
import { STORE } from "@/lib/store-config";

interface OrderResult {
  order_number: string;
  subtotal: number;
  discount: number;
  total: number;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("العيون");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  const checkCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage(null);
      setDiscountPercent(null);
      return;
    }
    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc("validate_coupon", {
      p_code: couponCode.trim(),
      p_subtotal: totalPrice,
    });
    if (rpcError) {
      setCouponMessage("تعذّر التحقق من الكود");
      setDiscountPercent(null);
      return;
    }
    const payload = data as unknown as {
      valid: boolean;
      message: string;
      discount_percent?: number;
    };
    setCouponMessage(payload.message);
    setDiscountPercent(payload.valid ? (payload.discount_percent ?? null) : null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc("create_order", {
      p_customer_name: name,
      p_phone: phone,
      p_city: city,
      p_district: district,
      p_address: address,
      p_notes: notes,
      p_coupon_code: couponCode || "",
      p_items: items.map((item) => ({
        product_id: item.productId,
        qty: item.quantity,
        color: item.color,
        size: item.size,
      })),
    });

    setSubmitting(false);

    if (rpcError) {
      setError(rpcError.message || "تعذّر إتمام الطلب، حاولي مرة أخرى");
      return;
    }

    const order = data as unknown as OrderResult;
    setResult(order);
    clearCart();
  };

  if (result) {
    const whatsappMessage =
      `طلب جديد ${result.order_number}\n` +
      `الاسم: ${name}\n` +
      `الهاتف: ${phone}\n` +
      `المدينة: ${city}${district ? ` - ${district}` : ""}\n` +
      `العنوان: ${address || "-"}\n` +
      items.map((item) => `- ${item.name} × ${item.quantity}`).join("\n") +
      `\nالمجموع: ${formatPriceMAD(result.total)}` +
      (notes ? `\nملاحظات: ${notes}` : "");

    const whatsappHref = STORE.whatsappNumber
      ? `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
      : null;

    return (
      <div className="mx-auto w-full max-w-xl px-6 py-24 text-center">
        <h1 className="font-display mb-4 text-3xl text-brown-900">
          تم استلام طلبكِ 🎉
        </h1>
        <p className="mb-2 text-lg text-brown-800">
          رقم الطلب: <span className="font-semibold text-rust-700">{result.order_number}</span>
        </p>
        <p className="mb-8 text-brown-800">
          المجموع: {formatPriceMAD(result.total)} — الدفع عند الاستلام
        </p>
        <div className="flex flex-col items-center gap-3">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600"
            >
              تأكيد الطلب عبر واتساب
            </a>
          )}
          <Link href="/products" className="text-sm text-clay-600 hover:text-clay-500">
            متابعة التسوق
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-xl px-6 py-24 text-center">
        <p className="mb-4 text-brown-800">سلتك فارغة.</p>
        <Link
          href="/products"
          className="rounded-full bg-clay-500 px-6 py-2.5 text-sm font-medium text-cream hover:bg-clay-600"
        >
          تصفّحي المنتجات
        </Link>
      </div>
    );
  }

  const discountedTotal = discountPercent
    ? totalPrice - Math.round((totalPrice * discountPercent) / 100)
    : totalPrice;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display mb-8 text-3xl text-brown-900">إتمام الطلب</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            الاسم الكامل
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-sand-200 bg-cream px-4 py-2.5 outline-none focus:border-clay-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            رقم الهاتف
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-lg border border-sand-200 bg-cream px-4 py-2.5 outline-none focus:border-clay-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            المدينة
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-lg border border-sand-200 bg-cream px-4 py-2.5 outline-none focus:border-clay-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            الحي (اختياري)
            <input
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="rounded-lg border border-sand-200 bg-cream px-4 py-2.5 outline-none focus:border-clay-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            العنوان بالتفصيل
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="resize-none rounded-lg border border-sand-200 bg-cream px-4 py-2.5 outline-none focus:border-clay-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            ملاحظات (اختياري)
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="resize-none rounded-lg border border-sand-200 bg-cream px-4 py-2.5 outline-none focus:border-clay-400"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            كود الخصم (اختياري)
            <div className="flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 rounded-lg border border-sand-200 bg-cream px-4 py-2.5 outline-none focus:border-clay-400"
              />
              <button
                type="button"
                onClick={checkCoupon}
                className="rounded-lg border border-sand-200 px-4 text-sm font-medium text-brown-900 hover:border-clay-400"
              >
                تحقق
              </button>
            </div>
            {couponMessage && (
              <span className={discountPercent ? "text-rust-700" : "text-maroon-700"}>
                {couponMessage}
              </span>
            )}
          </label>

          {error && <p className="text-sm text-maroon-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600 disabled:opacity-50"
          >
            {submitting ? "جارٍ إرسال الطلب..." : "تأكيد الطلب — الدفع عند الاستلام"}
          </button>
        </form>

        <div className="flex h-fit flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6">
          <h2 className="font-display text-lg text-brown-900">ملخص الطلب</h2>
          {items.map((item) => (
            <div key={item.key} className="flex justify-between text-sm text-brown-800">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPriceMAD(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-sand-200 pt-3 text-sm text-brown-800">
            <div className="flex justify-between">
              <span>المجموع الفرعي</span>
              <span>{formatPriceMAD(totalPrice)}</span>
            </div>
            {discountPercent && (
              <div className="flex justify-between text-rust-700">
                <span>الخصم ({discountPercent}%)</span>
                <span>- {formatPriceMAD(totalPrice - discountedTotal)}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between border-t border-sand-200 pt-3 text-lg font-semibold text-brown-900">
            <span>الإجمالي</span>
            <span>{formatPriceMAD(discountedTotal)}</span>
          </div>
          <p className="text-xs text-brown-800/70">الدفع عند الاستلام — Cash on Delivery</p>
        </div>
      </div>
    </div>
  );
}
