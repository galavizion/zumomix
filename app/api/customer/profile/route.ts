import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyCustomerToken } from "@/lib/jwt";

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("customer_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const decoded = verifyCustomerToken(token);
    const body = await request.json();

    const allowed = ["nombre", "telefono", "calle", "colonia", "ciudad", "estado", "cp"];
    const updateData: Record<string, string> = {};

    allowed.forEach((field) => {
      if (field in body && typeof body[field] === "string") {
        updateData[field] = body[field];
      }
    });

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("customers")
      .update(updateData)
      .eq("id", decoded.id)
      .select()
      .single();

    if (error) throw error;

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
      updated_at: data.updated_at,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
}
