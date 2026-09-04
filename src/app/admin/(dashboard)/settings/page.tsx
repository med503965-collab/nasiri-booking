import { requireAdmin } from "@/lib/supabase/require-admin";
import { updateStoreSettings, updateStoreBranding } from "@/app/admin/actions";
import { AccountForm } from "@/components/admin/AccountForm";
import { StoreLogoUploader } from "@/components/admin/StoreLogoUploader";

export default async function AdminSettingsPage() {
  const { supabase, user } = await requireAdmin();
  const { data: settings } = await supabase
    .from("store_settings")
    .select("*")
    .eq("id", true)
    .maybeSingle();

  return (
    <div className="max-w-xl">
      <h1 className="font-display mb-6 text-2xl text-brown-900">إعدادات المتجر</h1>

      <h2 className="font-display mb-3 text-lg text-brown-900">حسابي (البريد وكلمة السر)</h2>
      <AccountForm currentEmail={user.email ?? ""} />

      <h2 className="font-display mt-10 mb-3 text-lg text-brown-900">
        اسم المتجر والشعار
      </h2>
      <form
        action={updateStoreBranding}
        className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6"
      >
        <StoreLogoUploader name="logo_url" initialUrl={settings?.logo_url || "/logo.png"} />
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          اسم المتجر (بالحروف اللاتينية)
          <input
            name="store_name"
            defaultValue={settings?.store_name || "AYOUNA"}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          اسم المتجر (بالعربية)
          <input
            name="store_name_ar"
            defaultValue={settings?.store_name_ar || "أيونا"}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-fit rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600"
        >
          حفظ الاسم والشعار
        </button>
      </form>

      <h2 className="font-display mt-10 mb-3 text-lg text-brown-900">إعدادات المتجر العامة</h2>
      <form action={updateStoreSettings} className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          نص الإعلان العلوي
          <input
            name="banner_text"
            defaultValue={settings?.banner_text ?? ""}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          رقم هاتف التواصل (يظهر للعملاء)
          <input
            name="contact_phone"
            defaultValue={settings?.contact_phone ?? ""}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          رسوم التوصيل (MAD)
          <input
            name="delivery_fee"
            type="number"
            step="0.01"
            min="0"
            defaultValue={settings?.delivery_fee ?? 0}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <p className="text-xs text-brown-800/70">
          ملاحظة: رسوم التوصيل هنا للعرض فقط حاليًا؛ الطلبات تُحسب برسوم توصيل 0 درهم.
        </p>
        <button
          type="submit"
          className="mt-2 w-fit rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600"
        >
          حفظ الإعدادات
        </button>
      </form>
    </div>
  );
}
