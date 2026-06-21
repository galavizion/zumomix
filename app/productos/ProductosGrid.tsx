"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const BADGE: Record<string, { label: string; color: string; bg: string }> = {
  "1": { label: "Más vendido", color: "rgb(122,181,54)", bg: "rgb(232,245,216)" },
  "2": { label: "Pro", color: "rgb(37,99,235)", bg: "rgb(219,234,254)" },
  "3": { label: "Alta capacidad", color: "rgb(217,119,6)", bg: "rgb(254,243,199)" },
  "4": { label: "Nuevo", color: "rgb(220,38,38)", bg: "rgb(254,226,226)" },
};

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const badge = BADGE[product.id];

  return (
    <article className="product-card-new">
      {/* Imagen */}
      <Link href={`/productos/${product.slug}`} style={{ display: "block", position: "relative", background: "#ffffff", overflow: "hidden" }}>
        <div style={{ position: "relative", aspectRatio: "4/3" }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: "contain", padding: "20px", transition: "transform 0.3s" }}
            className="group-hover:scale-105"
          />
        </div>
        {badge && (
          <span style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            background: badge.bg,
            color: badge.color,
            fontSize: "11.5px",
            fontWeight: "700",
            padding: "4px 11px",
            borderRadius: "999px",
            letterSpacing: "0.01em",
          }}>
            {badge.label}
          </span>
        )}
      </Link>

      {/* Info */}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        <div style={{ flex: 1 }}>
          <Link href={`/productos/${product.slug}`} style={{ textDecoration: "none" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "rgb(34, 48, 15)",
              lineHeight: 1.3,
              marginBottom: "6px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {product.name}
            </h3>
          </Link>
          <p style={{ fontSize: "13.5px", color: "rgb(124, 135, 114)", lineHeight: 1.5 }}>
            {product.shortDescription}
          </p>
        </div>

        {product.price > 0 && (
          <div style={{ fontSize: "20px", fontWeight: "800", color: "rgb(122, 181, 54)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {formatPrice(product.price)}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href={`/productos/${product.slug}`}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1.5px solid rgb(216, 232, 194)",
              color: "rgb(72, 84, 60)",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            Ver más
          </Link>
          <button
            onClick={() => addItem(product, 1)}
            aria-label={`Agregar ${product.name} al carrito`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 14px",
              borderRadius: "12px",
              background: "rgb(122, 181, 54)",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s",
              boxShadow: "0 4px 14px rgba(122, 181, 54, 0.3)",
            }}
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductosGrid({ products }: { products: Product[] }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
