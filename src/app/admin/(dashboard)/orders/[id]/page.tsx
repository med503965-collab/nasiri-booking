import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { updateOrderStatus } from "@/app/admin/actions";
import { formatPriceMAD } from "@/lib/types";

const STATUSES = ["جديد", "تم التأكيد", "قيد التجهيز", "خرج للتوصيل", "تم التسليم", "ملغى"];

export default async function AdminOrderDetailPage(props: PageProps<"/admin/orders/[id]">) {
  const { id } = await props.params;
  const { supabase } = await requireAdmin();

  const [{ data: order }, { data: items }] = await Promise.all([
    supabase.from("orders").select("*").eq("id", id).maybeSingle(),
    supabase.from("order_items").select("*").eq("order_id", id),
  ]);

  if (!order) notFound();

  async function setStatus(formData: FormData) {
    "use server";
    await updateOrderStatus(order!.id, String(formData.get("status")));
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display mb-2 text-2xl text-brown-900">طلب {order.order_number}</h1>
      <p className="mb-6 text-sm text-brown-800">
        {new Date(order.created_at).toLocaleString("ar-MA")}
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-sand-200 bg-cream p-6 sm:grid-cols-2">
        <div>
          <p className="text-sm text-brown-800">العميلة</p>
          <p className="font-medium text-brown-900">{order.customer_name}</p>
        </div>
        <div>
          <p className="text-sm text-brown-800">الهاتف</p>
          <p className="font-medium text-brown-900">{order.phone}</p>
        </div>
        <div>
          <p className="text-sm text-brown-800">المدينة</p>
          <p className="font-medium text-brown-900">{order.city}{order.district ? ` - ${order.district}` : ""}</p>
        </div>
        <div>
          <p className="text-sm text-brown-800">العنوان</p>
          <p className="font-medium text-brown-900">{order.address || "—"}</p>
        </div>
        {order.notes && (
          <div className="sm:col-span-2">
            <p className="text-sm text-brown-800">ملاحظات</p>
            <p className="font-medium text-brown-900">{order.notes}</p>
          </div>
        )}
      </div>

      <div className="mb-6 rounded-2xl border border-sand-200 bg-cream p-6">
        <h2 className="mb-3 font-display text-lg text-brown-900">المنتجات</h2>
        <ul className="flex flex-col gap-2 text-sm text-brown-800">
          {(items ?? []).map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.product_name} × {item.qty}
                {(item.color || item.size) && ` — ${[item.color, item.size].filter(Boolean).join(" / ")}`}
              </span>
              <span>{formatPriceMAD(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-sand-200 pt-3 font-semibold text-brown-900">
          <span>الإجمالي</span>
          <span>{formatPriceMAD(order.total)}</span>
        </div>
      </div>

      <form action={setStatus} className="flex items-end gap-3 rounded-2xl border border-sand-200 bg-cream p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          حالة الطلب
          <select name="status" defaultValue={order.status} className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400">
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded-full bg-brown-900 px-5 py-2 text-sm font-medium text-cream hover:bg-clay-600">
          تحديث الحالة
        </button>
      </form>
    </div>
  );
}
