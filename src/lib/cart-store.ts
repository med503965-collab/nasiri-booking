import type { Product } from "@/lib/types";

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  color: string | null;
  size: string | null;
  quantity: number;
}

const STORAGE_KEY = "ayouna-cart";
const listeners = new Set<() => void>();

function itemKey(productId: string, color: string | null, size: string | null) {
  return `${productId}::${color ?? ""}::${size ?? ""}`;
}

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

let items: CartItem[] = loadFromStorage();

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function setItems(next: CartItem[]) {
  items = next;
  persist();
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): CartItem[] {
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return [];
}

export function addItem(
  product: Product,
  quantity = 1,
  options?: { color?: string | null; size?: string | null },
) {
  const color = options?.color ?? null;
  const size = options?.size ?? null;
  const key = itemKey(product.id, color, size);
  const existing = items.find((item) => item.key === key);

  if (existing) {
    setItems(
      items.map((item) =>
        item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
      ),
    );
    return;
  }

  setItems([
    ...items,
    {
      key,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? null,
      color,
      size,
      quantity,
    },
  ]);
}

export function removeItem(key: string) {
  setItems(items.filter((item) => item.key !== key));
}

export function updateQuantity(key: string, quantity: number) {
  if (quantity < 1) {
    removeItem(key);
    return;
  }
  setItems(items.map((item) => (item.key === key ? { ...item, quantity } : item)));
}

export function clearCart() {
  setItems([]);
}
