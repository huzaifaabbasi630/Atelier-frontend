import { Product } from '../types';

const STORAGE_KEY = 'atelier-recently-viewed';
const MAX_ITEMS = 10;

const safeParse = (value: string | null): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

export const getRecentlyViewedIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

export const saveRecentlyViewedIds = (ids: string[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
};

export const addRecentlyViewedId = (productId: string): string[] => {
  const ids = getRecentlyViewedIds();
  const next = [productId, ...ids.filter((id) => id !== productId)].slice(0, MAX_ITEMS);
  saveRecentlyViewedIds(next);
  return next;
};

export const getRecentlyViewedProducts = (products: Product[]): Product[] => {
  const ids = getRecentlyViewedIds();
  return ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
};
