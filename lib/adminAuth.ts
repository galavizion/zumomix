import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getJwtSecret } from "@/lib/jwt";

export function signAdminToken(): string {
  return jwt.sign({ role: "admin" }, getJwtSecret(), { expiresIn: "24h" });
}

export function verifyAdminToken(req: NextRequest): boolean {
  const token = req.cookies.get("admin-token")?.value;
  if (!token) return false;
  try {
    const payload = jwt.verify(token, getJwtSecret()) as { role?: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}
