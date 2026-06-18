import jwt from "jsonwebtoken";

export function getJwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET no está configurado en las variables de entorno");
  return s;
}

export function signCustomerToken(payload: { id: string; email: string }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "30d" });
}

export function verifyCustomerToken(token: string): { id: string; email: string } {
  return jwt.verify(token, getJwtSecret()) as { id: string; email: string };
}
