import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/constants";

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("data")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Auto-seed on first run
  if (!data || data.length === 0) {
    const rows = PRODUCTS.map((p) => ({
      id: p.id,
      slug: p.slug,
      status: p.status,
      data: p,
      updated_at: new Date().toISOString(),
    }));
    await supabase.from("products").upsert(rows, { onConflict: "id" });
    return NextResponse.json(PRODUCTS);
  }

  return NextResponse.json(data.map((r) => r.data));
}

export async function POST(req: Request) {
  const product = await req.json();

  const { data, error } = await supabase
    .from("products")
    .insert({
      id: product.id,
      slug: product.slug,
      status: product.status,
      data: product,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.data);
}
