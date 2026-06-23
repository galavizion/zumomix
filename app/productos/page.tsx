import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types";
import { supabase } from "@/lib/supabase";
import ProductosGrid from "./ProductosGrid";

async function getProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("data")
    .order("updated_at", { ascending: false });
  if (data && data.length > 0) return data.map((r) => r.data as Product).filter((p) => p.status === "active");
  return PRODUCTS.filter((p) => p.status === "active");
}

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo completo de exprimidores, dispensadoras y máquinas granita Zumomix.",
};

const CATEGORIES: { value: ProductCategory | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "exprimidores", label: "Exprimidores" },
  { value: "dispensadoras", label: "Dispensadoras" },
  { value: "maquinas", label: "Máquinas" },
  { value: "concentrados", label: "Concentrados" },
];

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const categoria = params.categoria ?? "todos";
  const allProducts = await getProducts();
  const filtered =
    categoria === "todos"
      ? allProducts
      : allProducts.filter((p) => p.category === categoria);

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <section className="page-hero">
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "60px 28px 56px" }}>
          <div style={{ maxWidth: "620px" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "white",
              border: "1px solid rgb(216, 232, 194)",
              color: "rgb(122, 181, 54)",
              fontSize: "13px",
              fontWeight: "600",
              padding: "7px 14px",
              borderRadius: "999px",
              marginBottom: "20px",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgb(122, 181, 54)", display: "inline-block" }}></span>
              {filtered.length} equipo{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}
            </span>
            <h1 style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.02em",
              lineHeight: 1.06,
              marginBottom: "14px",
            }}>
              Equipos profesionales<br />
              <span style={{ color: "rgb(122, 181, 54)" }}>para tu negocio</span>
            </h1>
            <p style={{ fontSize: "17px", color: "rgb(91, 102, 80)", lineHeight: 1.6 }}>
              Exprimidores, dispensadoras y máquinas granita. Envíos a toda la República Mexicana.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros + Grid */}
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "40px 28px 80px" }}>
        {/* Filtros */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
          {CATEGORIES.map((cat) => {
            const active = categoria === cat.value;
            return (
              <a
                key={cat.value}
                href={cat.value === "todos" ? "/productos" : `/productos?categoria=${cat.value}`}
                style={{
                  padding: "9px 20px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: active ? "rgb(122, 181, 54)" : "white",
                  color: active ? "white" : "rgb(72, 84, 60)",
                  border: active ? "1.5px solid rgb(122, 181, 54)" : "1.5px solid rgb(216, 232, 194)",
                  boxShadow: active ? "0 4px 14px rgba(122, 181, 54, 0.25)" : "none",
                }}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {/* Grid de productos */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgb(124, 135, 114)" }}>
            <p style={{ fontSize: "18px" }}>No hay productos en esta categoría.</p>
          </div>
        ) : (
          <ProductosGrid products={filtered} />
        )}
      </div>
    </div>
  );
}
