import type { Product } from "@/lib/products";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

const STORAGE_KEY = "ayouna-cart";
const listeners = new Set<() => void>();

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

export function addItem(product: Product, quantity = 1) {
  const existing = items.find((item) => item.slug === product.slug);
  if (existing) {
    setItems(
      items.map((item) =>
        item.slug === product.slug
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      ),
    );
    return;
  }
  setItems([
    ...items,
    { slug: product.slug, name: product.name, price: product.price, quantity },
  ]);
}

export function removeItem(slug: string) {
  setItems(items.filter((item) => item.slug !== slug));
}

export function updateQuantity(slug: string, quantity: number) {
  if (quantity < 1) {
    removeItem(slug);
    return;
  }
  setItems(items.map((item) => (item.slug === slug ? { ...item, quantity } : item)));
}

export function clearCart() {
  setItems([]);
}
