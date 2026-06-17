import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Verificar token admin (simplificado - en producción implementar mejor)
    const adminToken = request.cookies.get("admin-token")?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

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
