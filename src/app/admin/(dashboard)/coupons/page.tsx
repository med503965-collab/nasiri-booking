import { requireAdmin } from "@/lib/supabase/require-admin";
import { createCoupon, deleteCoupon } from "@/app/admin/actions";

export default async function AdminCouponsPage() {
  const { supabase } = await requireAdmin();
  const { data: coupons } = await supabase.from("coupons").select("*").order("code");

  return (
    <div>
      <h1 className="font-display mb-6 text-2xl text-brown-900">الكوبونات</h1>

      <form action={createCoupon} className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-sand-200 bg-cream p-6 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          الكود
          <input name="code" required className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          نسبة الخصم %
          <input name="discount_percent" type="number" min={1} max={100} required className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          حد أدنى للطلب
          <input name="min_order" type="number" min={0} defaultValue={0} className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          حد الاستخدام (اختياري)
          <input name="usage_limit" type="number" min={1} className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          تاريخ البدء (اختياري)
          <input name="start_date" type="date" className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          تاريخ الانتهاء (اختياري)
          <input name="end_date" type="date" className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <button type="submit" className="w-fit rounded-full bg-brown-900 px-5 py-2 text-sm font-medium text-cream hover:bg-clay-600 sm:col-span-3">
          إضافة كوبون
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-sand-200 bg-cream">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-200 text-brown-900">
              <th className="p-3 text-start">الكود</th>
              <th className="p-3 text-start">الخصم</th>
              <th className="p-3 text-start">الحد الأدنى</th>
              <th className="p-3 text-start">الاستخدام</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {(coupons ?? []).map((coupon) => (
              <tr key={coupon.id} className="border-b border-sand-200 last:border-0">
                <td className="p-3 font-medium text-brown-900">{coupon.code}</td>
                <td className="p-3 text-brown-800">{coupon.discount_percent}%</td>
                <td className="p-3 text-brown-800">{coupon.min_order}</td>
                <td className="p-3 text-brown-800">
                  {coupon.used_count}{coupon.usage_limit ? ` / ${coupon.usage_limit}` : ""}
                </td>
                <td className="p-3">
                  <form action={deleteCoupon.bind(null, coupon.id)}>
                    <button type="submit" className="text-maroon-700 hover:underline">
                      حذف
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
