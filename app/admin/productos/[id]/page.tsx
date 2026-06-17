import ProductoFormClient from "./ProductoFormClient";
import { PRODUCTS } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminProductoDetailPage({ params }: Props) {
  const { id } = await params;
  const product = id === "nuevo" ? null : PRODUCTS.find((p) => p.id === id) ?? null;
  return <ProductoFormClient product={product} isNew={id === "nuevo"} />;
}
