import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { deleteProduct } from "@/app/admin/actions";
import { formatPriceMAD } from "@/lib/types";

export default async function AdminProductsPage() {
  const { supabase } = await requireAdmin();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-brown-900">المنتجات</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brown-900 px-5 py-2 text-sm font-medium text-cream hover:bg-clay-600"
        >
          + إضافة منتج
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-sand-200 bg-cream">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-200 text-start text-brown-900">
              <th className="p-3 text-start">المنتج</th>
              <th className="p-3 text-start">الفئة</th>
              <th className="p-3 text-start">السعر</th>
              <th className="p-3 text-start">المخزون</th>
              <th className="p-3 text-start">الحالة</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product) => (
              <tr key={product.id} className="border-b border-sand-200 last:border-0">
                <td className="p-3 text-brown-900">{product.name}</td>
                <td className="p-3 text-brown-800">{product.category}</td>
                <td className="p-3 text-brown-800">{formatPriceMAD(product.price)}</td>
                <td className="p-3 text-brown-800">
                  {product.stock <= 0 ? (
                    <span className="text-maroon-700">نفد</span>
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="p-3 text-brown-800">
                  {product.status === "active" ? "مفعّل" : "مخفي"}
                </td>
                <td className="flex gap-3 p-3">
                  <Link href={`/admin/products/${product.id}/edit`} className="text-clay-600 hover:text-clay-500">
                    تعديل
                  </Link>
                  <form action={deleteProduct.bind(null, product.id)}>
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
