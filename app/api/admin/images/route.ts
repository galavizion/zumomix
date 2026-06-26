import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.storage
    .from("archivos")
    .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

  if (error) return NextResponse.json({ images: [] });

  const images = (data ?? [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => ({
      name: f.name,
      url: supabase.storage.from("archivos").getPublicUrl(f.name).data.publicUrl,
    }));

  return NextResponse.json({ images });
}
