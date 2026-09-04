"use client";

import { useState, type FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("البريد الإلكتروني أو كلمة السر غير صحيحة");
      return;
    }
    router.push(searchParams.get("next") || "/account");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-md px-6 py-20">
      <h1 className="font-display mb-8 text-center text-3xl text-brown-900">تسجيل الدخول</h1>
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
        {error && <p className="text-sm text-maroon-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600 disabled:opacity-50"
        >
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-brown-800">
        ليس لديكِ حساب؟{" "}
        <Link href="/register" className="text-clay-600 hover:text-clay-500">
          أنشئي حسابًا
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
