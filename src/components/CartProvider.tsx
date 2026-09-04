"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import * as cartStore from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    options?: { color?: string | null; size?: string | null },
  ) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem: cartStore.addItem,
        removeItem: cartStore.removeItem,
        updateQuantity: cartStore.updateQuantity,
        clearCart: cartStore.clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart يجب أن يُستخدم داخل CartProvider");
  }
  return context;
}
