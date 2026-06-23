import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("product_extras")
    .select("data")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.data ?? null);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { slug } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("product_extras")
    .upsert(
      { slug, data: body, updated_at: new Date().toISOString() },
      { onConflict: "slug" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
