"use client";

import { useState, type FormEvent } from "react";
import { PasswordInput } from "@/components/PasswordInput";
import { createClient } from "@/lib/supabase/client";

export function AccountForm({ currentEmail }: { currentEmail: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const updates: { email?: string; password?: string } = {};
    if (email && email !== currentEmail) updates.email = email;
    if (password) updates.password = password;

    if (Object.keys(updates).length === 0) {
      setLoading(false);
      setMessage({ type: "error", text: "لا يوجد تغيير لحفظه" });
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser(updates);
    setLoading(false);
    event.currentTarget.reset();

    if (error) {
      setMessage({ type: "error", text: "تعذّر الحفظ: " + error.message });
      return;
    }

    setMessage({
      type: "success",
      text: updates.email
        ? "تم الحفظ. تحققي من بريدكِ الجديد لتأكيده قبل أن يصبح فعّالًا."
        : "تم تحديث كلمة السر بنجاح.",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6"
    >
      <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
        البريد الإلكتروني
        <input
          name="email"
          type="email"
          defaultValue={currentEmail}
          className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 outline-none focus:border-clay-400"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
        كلمة سر جديدة (اتركيها فارغة إذا لا تريدين تغييرها)
        <PasswordInput
          name="password"
          minLength={6}
          autoComplete="new-password"
          placeholder="••••••••"
        />
      </label>
      {message && (
        <p
          className={
            message.type === "success" ? "text-sm text-rust-700" : "text-sm text-maroon-700"
          }
        >
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-fit rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600 disabled:opacity-50"
      >
        {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
    </form>
  );
}
