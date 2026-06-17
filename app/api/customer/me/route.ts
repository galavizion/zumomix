import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      // Intenta desde localStorage (client-side)
      const cookieToken = request.cookies.get("customer_token")?.value;
      if (!cookieToken) {
        return NextResponse.json(
          { error: "No autenticado" },
          { status: 401 }
        );
      }
    }

    const finalToken = token || request.cookies.get("customer_token")?.value;

    const decoded = jwt.verify(
      finalToken!,
      process.env.JWT_SECRET || "tu-secret-key"
    ) as any;

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", decoded.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

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
    });
  } catch (error) {
    console.error("Get customer error:", error);
    return NextResponse.json(
      { error: "Error obteniendo cliente" },
      { status: 500 }
    );
  }
}
