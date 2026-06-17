import { PRODUCTS } from "./constants";
import type { Product } from "@/types";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

async function fetchMedusa(path: string) {
  if (!MEDUSA_URL) return null;
  try {
    const res = await fetch(`${MEDUSA_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchMedusa("/store/products");
  if (data?.products) return data.products;
  return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const data = await fetchMedusa(`/store/products?handle=${slug}`);
  if (data?.products?.[0]) return data.products[0];
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function createCart() {
  const data = await fetchMedusa("/store/carts");
  return data?.cart ?? null;
}
