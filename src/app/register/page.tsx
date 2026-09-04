"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    setLoading(false);

    if (signUpError) {
      setError(
        signUpError.message.includes("already registered")
          ? "هذا البريد الإلكتروني مسجّل بالفعل"
          : "تعذّر إنشاء الحساب، حاولي مرة أخرى",
      );
      return;
    }

    if (data.session) {
      router.push("/account");
      router.refresh();
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto w-full max-w-md px-6 py-24 text-center">
        <h1 className="font-display mb-4 text-3xl text-brown-900">تم إنشاء الحساب</h1>
        <p className="mb-6 text-brown-800">
          تحققي من بريدكِ الإلكتروني لتأكيد الحساب، ثم سجّلي الدخول.
        </p>
        <Link
          href="/login"
          className="rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600"
        >
          الذهاب لتسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 py-20">
      <h1 className="font-display mb-8 text-center text-3xl text-brown-900">إنشاء حساب</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          الاسم الكامل
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          رقم الهاتف
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
          />
        </label>
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
            minLength={6}
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
          {loading ? "جارٍ الإنشاء..." : "إنشاء حساب"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-brown-800">
        لديكِ حساب بالفعل؟{" "}
        <Link href="/login" className="text-clay-600 hover:text-clay-500">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
