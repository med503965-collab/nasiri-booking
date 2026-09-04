import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { updateProduct } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage(
  props: PageProps<"/admin/products/[id]/edit">,
) {
  const { id } = await props.params;
  const { supabase } = await requireAdmin();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display mb-6 text-2xl text-brown-900">تعديل {product.name}</h1>
      <ProductForm
        action={updateProduct.bind(null, product.id)}
        categories={categories ?? []}
        product={product}
        submitLabel="حفظ التعديلات"
      />
    </div>
  );
}
