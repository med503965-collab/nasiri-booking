import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Category, Product } from "@/lib/types";

export function ProductForm({
  action,
  categories,
  product,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  product?: Product;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6">
      <ImageUploader name="images" initialImages={product?.images ?? []} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          اسم المنتج
          <input
            required
            name="name"
            defaultValue={product?.name}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          الفئة
          <select
            required
            name="category"
            defaultValue={product?.category}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          >
            <option value="" disabled>
              اختاري فئة
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          السعر (MAD)
          <input
            required
            type="number"
            step="0.01"
            min="0"
            name="price"
            defaultValue={product?.price}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          السعر قبل الخصم (اختياري)
          <input
            type="number"
            step="0.01"
            min="0"
            name="old_price"
            defaultValue={product?.old_price ?? ""}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          المخزون
          <input
            required
            type="number"
            min="0"
            name="stock"
            defaultValue={product?.stock ?? 0}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          رمز المنتج SKU (اختياري)
          <input
            name="sku"
            defaultValue={product?.sku ?? ""}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          شارة (اختياري)
          <select
            name="badge"
            defaultValue={product?.badge ?? ""}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          >
            <option value="">بدون</option>
            <option value="جديد">جديد</option>
            <option value="الأكثر مبيعًا">الأكثر مبيعًا</option>
            <option value="خصم">خصم</option>
          </select>
        </label>
        {product && (
          <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
            الحالة
            <select
              name="status"
              defaultValue={product.status}
              className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
            >
              <option value="active">مفعّل</option>
              <option value="hidden">مخفي</option>
            </select>
          </label>
        )}
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
        الألوان (مفصولة بفاصلة)
        <input
          name="colors"
          defaultValue={product?.colors.join(", ")}
          placeholder="أسود, بيج, بورجوندي"
          className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
        المقاسات (مفصولة بفاصلة)
        <input
          name="sizes"
          defaultValue={product?.sizes.join(", ")}
          placeholder="S, M, L, XL"
          className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
        الوصف
        <textarea
          name="description"
          defaultValue={product?.description ?? ""}
          rows={4}
          className="resize-none rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
        />
      </label>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600"
      >
        {submitLabel}
      </button>
    </form>
  );
}
