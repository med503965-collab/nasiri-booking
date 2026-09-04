import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/SignOutButton";
import { formatPriceMAD } from "@/lib/types";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle(),
    supabase
      .from("orders")
      .select("order_number, status, total, created_at")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-brown-900">حسابي</h1>
        <SignOutButton />
      </div>

      <div className="mb-8 rounded-2xl border border-sand-200 bg-cream p-6">
        <p className="text-brown-800">
          <span className="font-medium text-brown-900">الاسم:</span>{" "}
          {profile?.full_name || "—"}
        </p>
        <p className="text-brown-800">
          <span className="font-medium text-brown-900">الهاتف:</span>{" "}
          {profile?.phone || "—"}
        </p>
        <p className="text-brown-800">
          <span className="font-medium text-brown-900">البريد الإلكتروني:</span> {user.email}
        </p>
      </div>

      <div className="mb-8 flex gap-4">
        <Link
          href="/wishlist"
          className="rounded-full border border-sand-200 px-5 py-2 text-sm font-medium text-brown-900 hover:border-clay-400"
        >
          المفضلة
        </Link>
        <Link
          href="/account/orders"
          className="rounded-full border border-sand-200 px-5 py-2 text-sm font-medium text-brown-900 hover:border-clay-400"
        >
          كل الطلبات
        </Link>
      </div>

      <h2 className="font-display mb-4 text-xl text-brown-900">أحدث الطلبات</h2>
      {!orders || orders.length === 0 ? (
        <p className="text-brown-800">لا توجد طلبات بعد.</p>
      ) : (
        <div className="flex flex-col divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-cream">
          {orders.map((order) => (
            <div key={order.order_number} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-brown-900">{order.order_number}</p>
                <p className="text-sm text-brown-800">
                  {new Date(order.created_at).toLocaleDateString("ar-MA")}
                </p>
              </div>
              <div className="text-end">
                <p className="font-semibold text-rust-700">{formatPriceMAD(order.total)}</p>
                <p className="text-sm text-brown-800">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
