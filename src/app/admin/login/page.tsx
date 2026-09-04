import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getStoreBranding } from "@/lib/store-branding";

export default async function AdminLoginPage() {
  const branding = await getStoreBranding();

  return (
    <Suspense>
      <AdminLoginForm storeName={branding.name} logoUrl={branding.logoUrl} />
    </Suspense>
  );
}
