import type { Metadata } from "next";
import CarritoClient from "./CarritoClient";

export const metadata: Metadata = {
  title: "Carrito de compras",
  description: "Tu carrito de compras Zumomix.",
};

export default function CarritoPage() {
  return <CarritoClient />;
}
