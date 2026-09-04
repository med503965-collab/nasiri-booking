import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { SignOutButton } from "@/components/SignOutButton";

const NAV = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/products", label: "المنتجات" },
  { href: "/admin/categories", label: "التصنيفات" },
  { href: "/admin/orders", label: "الطلبات" },
  { href: "/admin/coupons", label: "الكوبونات" },
  { href: "/admin/customers", label: "العملاء" },
  { href: "/admin/settings", label: "الإعدادات" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row">
      <aside className="flex shrink-0 flex-row gap-2 overflow-x-auto md:w-56 md:flex-col md:overflow-visible">
        <div className="mb-2 hidden md:block">
          <p className="font-display text-lg text-brown-900">لوحة تحكم أيونا</p>
          <p className="text-sm text-brown-800">{profile?.full_name || "المدير"}</p>
        </div>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-brown-900 hover:bg-sand-100"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-4 hidden md:block">
          <SignOutButton redirectTo="/admin/login" />
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
