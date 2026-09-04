"use client";

import { useState, type FormEvent } from "react";
import { STORE } from "@/lib/store-config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `مرحبًا ${STORE.name}،\nالاسم: ${name}\nالرسالة: ${message}`;
    window.open(
      `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="font-display mb-2 text-3xl text-brown-900">تواصلي معنا</h1>
      <p className="mb-8 text-brown-800">
        يسعدنا تواصلكِ معنا لأي استفسار حول المنتجات أو الطلبات. فريق{" "}
        {STORE.nameAr} في {STORE.city} في خدمتكِ.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-cream p-6"
      >
        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          الاسم
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-lg border border-sand-200 bg-white px-4 py-2.5 text-brown-900 outline-none focus:border-clay-400"
            placeholder="اسمك الكامل"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-brown-900">
          رسالتك
          <textarea
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            className="resize-none rounded-lg border border-sand-200 bg-white px-4 py-2.5 text-brown-900 outline-none focus:border-clay-400"
            placeholder="اكتبي استفسارك هنا..."
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-full bg-brown-900 px-6 py-3 text-sm font-medium text-cream hover:bg-clay-600"
        >
          إرسال عبر واتساب
        </button>
      </form>
    </div>
  );
}
