import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { formatPriceMAD } from "@/lib/types";

export default async function AdminOverviewPage() {
  const { supabase } = await requireAdmin();

  const [
    { count: productCount },
    { count: lowStockCount },
    { count: orderCount },
    { count: newOrderCount },
    { data: recentOrders },
    { data: revenueRows },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).lte("stock", 3),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "جديد"),
    supabase
      .from("orders")
      .select("order_number, customer_name, total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("orders").select("total").neq("status", "ملغى"),
  ]);

  const totalRevenue = (revenueRows ?? []).reduce((sum, row) => sum + Number(row.total), 0);

  const stats = [
    { label: "إجمالي المنتجات", value: productCount ?? 0 },
    { label: "منتجات على وشك النفاد", value: lowStockCount ?? 0 },
    { label: "إجمالي الطلبات", value: orderCount ?? 0 },
    { label: "طلبات جديدة", value: newOrderCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-display mb-6 text-2xl text-brown-900">نظرة عامة</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-sand-200 bg-cream p-4 text-center">
            <p className="text-2xl font-semibold text-rust-700">{stat.value}</p>
            <p className="mt-1 text-sm text-brown-800">{stat.label}</p>
          </div>
        ))}
        <div className="col-span-2 rounded-2xl border border-sand-200 bg-cream p-4 text-center sm:col-span-4">
          <p className="text-2xl font-semibold text-rust-700">{formatPriceMAD(totalRevenue)}</p>
          <p className="mt-1 text-sm text-brown-800">إجمالي الإيرادات (باستثناء الملغاة)</p>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl text-brown-900">أحدث الطلبات</h2>
        <Link href="/admin/orders" className="text-sm text-clay-600 hover:text-clay-500">
          كل الطلبات ←
        </Link>
      </div>
      <div className="flex flex-col divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-cream">
        {(recentOrders ?? []).map((order) => (
          <div key={order.order_number} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-brown-900">{order.order_number}</p>
              <p className="text-sm text-brown-800">{order.customer_name}</p>
            </div>
            <div className="text-end">
              <p className="font-semibold text-rust-700">{formatPriceMAD(order.total)}</p>
              <p className="text-sm text-brown-800">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
