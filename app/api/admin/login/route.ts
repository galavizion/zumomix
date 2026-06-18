import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPass) {
    console.error("ADMIN_EMAIL o ADMIN_PASSWORD no están configurados");
    return NextResponse.json({ error: "Error de configuración del servidor" }, { status: 500 });
  }

  if (email !== validEmail || password !== validPass) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const token = signAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 86400,
    path: "/",
  });
  return res;
}
