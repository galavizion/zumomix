import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("products")
    .select("data")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data?.data) return NextResponse.json(data.data);

  // Fallback to constants
  const product = PRODUCTS.find((p) => p.id === id) ?? null;
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const product = await req.json();

  const { data, error } = await supabase
    .from("products")
    .upsert(
      { id, slug: product.slug, status: product.status, data: product, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.data);
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
