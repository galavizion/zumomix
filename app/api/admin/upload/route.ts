import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import { verifyAdminToken, unauthorizedResponse } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!verifyAdminToken(req)) return unauthorizedResponse();
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const customPath = formData.get("path") as string | null;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = customPath ? `${customPath}.${ext}` : `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from("archivos")
    .upload(filename, buffer, { contentType: file.type, upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from("archivos")
    .getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
