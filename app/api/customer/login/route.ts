import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    // Buscar el cliente
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, data.password_hash);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET || "tu-secret-key",
      { expiresIn: "30d" }
    );

    return NextResponse.json({
      token,
      customer: {
        id: data.id,
        email: data.email,
        nombre: data.nombre,
        telefono: data.telefono,
        calle: data.calle,
        ciudad: data.ciudad,
        estado: data.estado,
        cp: data.cp,
        created_at: data.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error en el login" },
      { status: 500 }
    );
  }
}
