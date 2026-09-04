"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPriceMAD } from "@/lib/types";

interface TrackedOrder {
  found: boolean;
  order_number?: string;
  status?: string;
  city?: string;
  total?: number;
  created_at?: string;
  items?: { product_name: string; qty: number; color: string | null; size: string | null }[];
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    const supabase = createClient();
    const { data } = await supabase.rpc("track_order", {
      p_order_number: orderNumber,
      p_phone: phone,
    });
    setResult(data as unknown as TrackedOrder);
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-16">
      <h1 className="font-display mb-2 text-3xl text-brown-900">تتبع طلبكِ</h1>
      <p className="mb-8 text-brown-800">أدخلي رقم الطلب ورقم الهاتف لمعرفة حالة طلبكِ.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          رقم الطلب (مثال: AY-000001)
          <input
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          رقم الهاتف المستخدم عند الطلب
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600 disabled:opacity-50"
        >
          {loading ? "جارٍ البحث..." : "تتبع الطلب"}
        </button>
      </form>

      {result && !result.found && (
        <p className="mt-6 text-center text-maroon-700">
          لم يتم العثور على طلب بهذه البيانات.
        </p>
      )}

      {result?.found && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-sand-200 bg-cream p-6">
          <div className="flex justify-between">
            <span className="text-brown-800">رقم الطلب</span>
            <span className="font-semibold text-brown-900">{result.order_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brown-800">الحالة</span>
            <span className="font-semibold text-rust-700">{result.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brown-800">المدينة</span>
            <span>{result.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brown-800">الإجمالي</span>
            <span className="font-semibold">{formatPriceMAD(result.total ?? 0)}</span>
          </div>
          <div className="border-t border-sand-200 pt-3">
            {result.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-brown-800">
                <span>
                  {item.product_name}
                  {(item.color || item.size) && ` (${[item.color, item.size].filter(Boolean).join(" / ")})`}
                </span>
                <span>× {item.qty}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
