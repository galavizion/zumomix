import ProductoFormClient from "./ProductoFormClient";
import { PRODUCTS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
  const { data } = await supabase
    .from("products")
    .select("data")
    .eq("id", id)
    .single();

  if (data?.data) return data.data as Product;
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export default async function AdminProductoDetailPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "nuevo";
  const product = isNew ? null : await getProduct(id);
  return <ProductoFormClient product={product} isNew={isNew} />;
}
