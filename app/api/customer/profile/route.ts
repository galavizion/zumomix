import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabase";

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("customer_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "tu-secret-key"
    ) as any;

    const body = await request.json();

    // Solo permitir actualizar estos campos
    const allowed = [
      "nombre",
      "telefono",
      "calle",
      "ciudad",
      "estado",
      "cp",
    ];
    const updateData: any = {};

    allowed.forEach((field) => {
      if (field in body) {
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
      ciudad: data.ciudad,
      estado: data.estado,
      cp: data.cp,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Error actualizando perfil" },
      { status: 500 }
    );
  }
}
