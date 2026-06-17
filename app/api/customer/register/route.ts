import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email, password, nombre } = await request.json();

    if (!email || !password || !nombre) {
      return NextResponse.json(
        { error: "Falta información requerida" },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const { data: existing } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el cliente
    const { data, error } = await supabase
      .from("customers")
      .insert({
        email,
        password_hash: passwordHash,
        nombre,
      })
      .select()
      .single();

    if (error) throw error;

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
        created_at: data.created_at,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Error en el registro" },
      { status: 500 }
    );
  }
}
