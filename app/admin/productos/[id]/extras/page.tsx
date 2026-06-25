import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import productExtras, { type ProductExtra } from "@/lib/productExtras";
import ExtrasFormClient from "./ExtrasFormClient";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ExtrasPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  // Load from Supabase first, fallback to hardcoded
  const { data: row } = await supabase
    .from("product_extras")
    .select("data")
    .eq("slug", product.slug)
    .single();

  const fromDb = row?.data as ProductExtra | null;
  const initial = (fromDb && Object.keys(fromDb).length > 0 ? fromDb : null) ?? productExtras[product.slug] ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/productos/${id}`}
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← {product.name}
        </Link>
        <span className="text-neutral-300">/</span>
        <span className="text-sm font-semibold text-neutral-900">Contenido extra</span>
      </div>

      <ExtrasFormClient slug={product.slug} initial={initial} />
    </div>
  );
}
