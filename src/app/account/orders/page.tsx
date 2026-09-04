import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPriceMAD } from "@/lib/types";

export const metadata = { title: "طلباتي | AYOUNA — أيونا" };

export default async function AccountOrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/account/orders");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("order_number, status, total, created_at, order_items(product_name, qty, color, size)")
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display mb-8 text-3xl text-brown-900">طلباتي</h1>

      {!orders || orders.length === 0 ? (
        <p className="text-brown-800">لا توجد طلبات بعد.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.order_number} className="rounded-2xl border border-sand-200 bg-cream p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-lg text-brown-900">{order.order_number}</span>
                <span className="rounded-full bg-sand-100 px-3 py-1 text-sm font-medium text-brown-900">
                  {order.status}
                </span>
              </div>
              <ul className="mb-3 flex flex-col gap-1 text-sm text-brown-800">
                {order.order_items.map((item, i) => (
                  <li key={i}>
                    {item.product_name} × {item.qty}
                    {(item.color || item.size) &&
                      ` — ${[item.color, item.size].filter(Boolean).join(" / ")}`}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-sand-200 pt-3">
                <span className="text-sm text-brown-800">
                  {new Date(order.created_at).toLocaleDateString("ar-MA")}
                </span>
                <span className="font-semibold text-rust-700">{formatPriceMAD(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
