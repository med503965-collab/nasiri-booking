"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const denied = searchParams.get("denied") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !data.user) {
      setLoading(false);
      setError("البريد الإلكتروني أو كلمة السر غير صحيحة");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      setLoading(false);
      setError("هذا الحساب لا يملك صلاحية الدخول للوحة التحكم");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-md px-6 py-20">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Logo className="h-10 w-10 text-clay-600" />
        <h1 className="font-display text-2xl text-brown-900">دخول لوحة تحكم أيونا</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          البريد الإلكتروني
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          كلمة السر
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        {denied && !error && (
          <p className="text-sm text-maroon-700">هذا الحساب لا يملك صلاحية الدخول للوحة التحكم</p>
        )}
        {error && <p className="text-sm text-maroon-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600 disabled:opacity-50"
        >
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
