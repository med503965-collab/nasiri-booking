import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { formatPriceMAD } from "@/lib/types";

const STATUSES = ["جديد", "تم التأكيد", "قيد التجهيز", "خرج للتوصيل", "تم التسليم", "ملغى"];

export default async function AdminOrdersPage(props: PageProps<"/admin/orders">) {
  const { status } = await props.searchParams;
  const activeStatus = typeof status === "string" ? status : undefined;
  const { supabase } = await requireAdmin();

  let query = supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (activeStatus) query = query.eq("status", activeStatus);
  const { data: orders } = await query;

  return (
    <div>
      <h1 className="font-display mb-6 text-2xl text-brown-900">الطلبات</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/admin/orders"
          className={`rounded-full border px-4 py-1.5 text-sm ${!activeStatus ? "border-brown-900 bg-brown-900 text-cream" : "border-sand-200 text-brown-800"}`}
        >
          الكل
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${encodeURIComponent(s)}`}
            className={`rounded-full border px-4 py-1.5 text-sm ${activeStatus === s ? "border-brown-900 bg-brown-900 text-cream" : "border-sand-200 text-brown-800"}`}
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-sand-200 bg-cream">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-200 text-brown-900">
              <th className="p-3 text-start">رقم الطلب</th>
              <th className="p-3 text-start">العميلة</th>
              <th className="p-3 text-start">المدينة</th>
              <th className="p-3 text-start">الإجمالي</th>
              <th className="p-3 text-start">الحالة</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((order) => (
              <tr key={order.id} className="border-b border-sand-200 last:border-0">
                <td className="p-3 font-medium text-brown-900">{order.order_number}</td>
                <td className="p-3 text-brown-800">{order.customer_name}</td>
                <td className="p-3 text-brown-800">{order.city}</td>
                <td className="p-3 text-brown-800">{formatPriceMAD(order.total)}</td>
                <td className="p-3 text-brown-800">{order.status}</td>
                <td className="p-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-clay-600 hover:text-clay-500">
                    التفاصيل
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
