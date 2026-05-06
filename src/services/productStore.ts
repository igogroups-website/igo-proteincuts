/**
 * Product Store
 * localStorage-based reactive product store.
 * Admin changes are saved here and broadcast to all listeners via custom events.
 */

import { Product } from '../types/product';
import { staticProducts } from '../data/staticProducts';

const STORE_KEY = 'igo_products';
const UPDATE_EVENT = 'igo_products_updated';

/** Load products from localStorage, fallback to static data */
export const loadProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('productStore: failed to parse localStorage', e);
  }
  // First run – seed from static data and persist
  saveProducts(staticProducts);
  return staticProducts;
};

/** Persist products array to localStorage and broadcast change event */
export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: products }));
};

/** Update a single product (upsert by id) */
export const upsertProduct = (updated: Partial<Product> & { id: number }): Product[] => {
  const current = loadProducts();
  const idx = current.findIndex(p => p.id === updated.id);
  let next: Product[];
  if (idx >= 0) {
    next = current.map(p => p.id === updated.id ? { ...p, ...updated } : p);
  } else {
    next = [...current, updated as Product];
  }
  saveProducts(next);
  return next;
};

/** Delete a product by id */
export const removeProduct = (id: number): Product[] => {
  const current = loadProducts();
  const next = current.filter(p => p.id !== id);
  saveProducts(next);
  return next;
};

/** Subscribe to product changes. Returns unsubscribe fn. */
export const subscribeToProducts = (cb: (products: Product[]) => void): (() => void) => {
  const handler = (e: Event) => {
    cb((e as CustomEvent<Product[]>).detail);
  };
  window.addEventListener(UPDATE_EVENT, handler);
  return () => window.removeEventListener(UPDATE_EVENT, handler);
};

/** Convert a File to a base64 data URL */
export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
