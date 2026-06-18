import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { signCustomerToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

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

    const validPassword = await bcrypt.compare(password, data.password_hash);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const token = signCustomerToken({ id: data.id, email: data.email });

    return NextResponse.json({
      token,
      customer: {
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
