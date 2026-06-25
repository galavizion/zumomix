import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import productExtras, { type ProductExtra } from "@/lib/productExtras";
import ExtrasFormClient from "./ExtrasFormClient";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function ExtrasPage({ params }: Props) {
  const { id } = await params;

  // Leer producto desde Supabase para tener el slug actual (puede haber sido editado)
  const { data: productRow } = await supabase
    .from("products")
    .select("data")
    .eq("id", id)
    .single();

  const product: Product | undefined =
    (productRow?.data as Product | null) ?? PRODUCTS.find((p) => p.id === id);

  if (!product) notFound();

  const slug = product.slug;

  // Cargar extras: Supabase primero, luego hardcodeado por slug actual o slug original
  const { data: row } = await supabase
    .from("product_extras")
    .select("data")
    .eq("slug", slug)
    .single();

  const fromDb = row?.data as ProductExtra | null;

  // Buscar en hardcoded por slug actual o por cualquier slug que haga match con el id
  const hardcoded =
    productExtras[slug] ??
    productExtras[PRODUCTS.find((p) => p.id === id)?.slug ?? ""] ??
    {};

  const initial =
    fromDb && Object.keys(fromDb).length > 0 ? fromDb : hardcoded;

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

      <ExtrasFormClient slug={slug} initial={initial} />
    </div>
  );
}
