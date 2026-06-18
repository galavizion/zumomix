import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyCustomerToken } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token =
      authHeader?.replace("Bearer ", "") ||
      request.cookies.get("customer_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const decoded = verifyCustomerToken(token);

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", decoded.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      id: data.id,
      email: data.email,
      nombre: data.nombre,
      telefono: data.telefono,
      calle: data.calle,
      colonia: data.colonia,
      ciudad: data.ciudad,
      estado: data.estado,
      cp: data.cp,
      created_at: data.created_at,
    });
  } catch (error) {
    console.error("Get customer error:", error);
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
}
