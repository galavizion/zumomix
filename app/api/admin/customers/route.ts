import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdminToken, unauthorizedResponse } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  try {

    const { data, error } = await supabase
      .from("customers")
      .select("id, email, nombre, telefono, calle, ciudad, estado, cp, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Get customers error:", error);
    return NextResponse.json(
      { error: "Error obteniendo clientes" },
      { status: 500 }
    );
  }
}
