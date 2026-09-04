import { requireAdmin } from "@/lib/supabase/require-admin";

export default async function AdminCustomersPage() {
  const { supabase } = await requireAdmin();
  const { data: customers } = await supabase
    .from("profiles")
    .select("id, full_name, phone, email, created_at")
    .eq("role", "customer")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display mb-6 text-2xl text-brown-900">العملاء</h1>

      {!customers || customers.length === 0 ? (
        <p className="text-brown-800">لا يوجد عملاء مسجّلون بعد.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-sand-200 bg-cream">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-brown-900">
                <th className="p-3 text-start">الاسم</th>
                <th className="p-3 text-start">البريد الإلكتروني</th>
                <th className="p-3 text-start">الهاتف</th>
                <th className="p-3 text-start">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-sand-200 last:border-0">
                  <td className="p-3 text-brown-900">{customer.full_name || "—"}</td>
                  <td className="p-3 text-brown-800">{customer.email}</td>
                  <td className="p-3 text-brown-800">{customer.phone || "—"}</td>
                  <td className="p-3 text-brown-800">
                    {new Date(customer.created_at).toLocaleDateString("ar-MA")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
