"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { StoreBranding } from "@/lib/store-branding";

const StoreSettingsContext = createContext<StoreBranding | undefined>(undefined);

export function StoreSettingsProvider({
  value,
  children,
}: {
  value: StoreBranding;
  children: ReactNode;
}) {
  return <StoreSettingsContext.Provider value={value}>{children}</StoreSettingsContext.Provider>;
}

export function useStoreSettings() {
  const context = useContext(StoreSettingsContext);
  if (!context) {
    throw new Error("useStoreSettings يجب أن يُستخدم داخل StoreSettingsProvider");
  }
  return context;
}
