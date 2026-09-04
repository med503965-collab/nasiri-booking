"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton({ redirectTo = "/", className = "" }: { redirectTo?: string; className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push(redirectTo);
        router.refresh();
      }}
      className={className || "text-sm text-maroon-700 hover:underline"}
    >
      تسجيل الخروج
    </button>
  );
}
