"use client";

import { useState } from "react";

export function PasswordInput({
  name,
  defaultValue,
  placeholder,
  required,
  minLength,
  autoComplete,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={visible ? "text" : "password"}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-sand-200 bg-white px-4 py-2.5 pe-11 outline-none focus:border-clay-400"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
        className="absolute inset-y-0 end-2 flex items-center px-1 text-brown-800/70 hover:text-brown-900"
      >
        {visible ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.5A9.6 9.6 0 0112 5c5 0 9 4 10 7-.4 1.1-1.1 2.3-2.1 3.4M6.6 6.6C4.4 8 2.9 9.9 2 12c1 3 5 7 10 7 1.4 0 2.7-.3 3.9-.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}
      </button>
    </div>
  );
}
