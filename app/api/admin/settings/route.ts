import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");
    if (error) throw error;
    const result: Record<string, string> = {};
    (data || []).forEach((row: { key: string; value: string }) => {
      result[row.key] = row.value ?? "";
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("settings GET:", err);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // body is a Record<string, string> of key-value pairs to upsert
    const rows = Object.entries(body).map(([key, value]) => ({
      key,
      value: String(value),
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("settings POST:", err);
    return NextResponse.json({ error: "Error guardando ajustes" }, { status: 500 });
  }
}
