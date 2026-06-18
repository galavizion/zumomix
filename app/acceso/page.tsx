import type { Metadata } from "next";
import AccesoClient from "./AccesoClient";

export const metadata: Metadata = { title: "Acceso Admin | Zumomix" };

export default function AccesoPage() {
  return <AccesoClient />;
}
