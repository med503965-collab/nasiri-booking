import { requireAdmin } from "@/lib/supabase/require-admin";
import { createProduct } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display mb-6 text-2xl text-brown-900">إضافة منتج جديد</h1>
      <ProductForm action={createProduct} categories={categories ?? []} submitLabel="إضافة المنتج" />
    </div>
  );
}
