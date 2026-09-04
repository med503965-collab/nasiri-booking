import { requireAdmin } from "@/lib/supabase/require-admin";
import { createCategory, deleteCategory } from "@/app/admin/actions";

export default async function AdminCategoriesPage() {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display mb-6 text-2xl text-brown-900">التصنيفات</h1>

      <form action={createCategory} className="mb-8 flex flex-wrap items-end gap-3 rounded-2xl border border-sand-200 bg-cream p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          الاسم
          <input name="name" required className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          الرمز (slug) — اتركيه فارغًا ليطابق الاسم
          <input name="slug" className="rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          الترتيب
          <input name="sort_order" type="number" defaultValue={0} className="w-24 rounded-lg border border-sand-200 bg-white px-4 py-2 outline-none focus:border-clay-400" />
        </label>
        <button type="submit" className="rounded-full bg-brown-900 px-5 py-2 text-sm font-medium text-cream hover:bg-clay-600">
          إضافة
        </button>
      </form>

      <div className="flex flex-col divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-cream">
        {(categories ?? []).map((category) => (
          <div key={category.id} className="flex items-center justify-between p-4">
            <span className="text-brown-900">{category.name}</span>
            <form action={deleteCategory.bind(null, category.id)}>
              <button type="submit" className="text-sm text-maroon-700 hover:underline">
                حذف
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
