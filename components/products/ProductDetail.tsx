"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import type { Product, ProductVariant } from "@/types";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] ?? null
  );

  const activePrice = selectedVariant?.price ?? product.salePrice ?? product.price;
  const activeSalePrice = selectedVariant ? undefined : product.salePrice;
  const activeOriginalPrice = selectedVariant ? selectedVariant.price : product.price;
  const activeName = selectedVariant
    ? `${product.name} ${selectedVariant.label.split("—")[0].trim()}`
    : product.name;

  const handleAdd = () => {
    const productToAdd = selectedVariant
      ? { ...product, name: activeName, price: activePrice, salePrice: undefined, sku: selectedVariant.sku }
      : product;
    addItem(productToAdd, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waMessage = encodeURIComponent(
    `Hola, me interesa el producto: ${activeName}. ¿Podrían darme más información?`
  );

  const categoryLabels: Record<string, string> = {
    exprimidores: "Exprimidor",
    dispensadoras: "Dispensador",
    maquinas: "Máquina",
  };

  const categoryLabel = categoryLabels[product.category] || "Producto";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "50px",
        alignItems: "start",
      }}
    >
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes buttonPress {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(1px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .product-image {
          animation: fadeInScale 0.6s ease-out;
        }
        .product-info {
          animation: slideInRight 0.6s ease-out;
        }
        .add-button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .add-button:active {
          animation: buttonPress 0.2s ease;
        }
        .add-button:hover {
          transform: translateY(-3px);
          box-shadow: rgba(122, 181, 54, 0.4) 0px 16px 36px !important;
        }
        .quantity-input {
          transition: all 0.2s ease;
        }
        .quantity-btn:hover {
          transform: scale(1.05);
        }
        .feature-item {
          transition: all 0.3s ease;
        }
        .feature-item:hover {
          transform: translateX(4px);
        }
      `}</style>
      {/* Imagen */}
      <div
        className="product-image"
        style={{
          borderRadius: "24px",
          padding: "28px",
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          boxShadow: "rgba(40, 60, 20, 0.12) 0px 16px 30px",
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={500}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          priority
        />
      </div>

      {/* Info */}
      <div
        className="product-info"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgb(154, 167, 138)",
              display: "block",
              marginBottom: "10px",
            }}
          >
            {categoryLabel}
          </span>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              lineHeight: "1.1",
            }}
          >
            {activeName}
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "rgb(91, 102, 80)",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Select de variantes */}
        {product.variants && product.variants.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "rgb(154, 167, 138)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Modelo
            </span>
            <select
              value={selectedVariant?.sku ?? ""}
              onChange={(e) => {
                const v = product.variants!.find((v) => v.sku === e.target.value) ?? null;
                setSelectedVariant(v);
              }}
              style={{
                padding: "12px 16px",
                borderRadius: "13px",
                border: "1.5px solid rgb(216, 232, 194)",
                fontSize: "15px",
                fontWeight: "600",
                color: "rgb(34, 48, 15)",
                background: "white",
                cursor: "pointer",
                appearance: "auto",
                maxWidth: "320px",
              }}
            >
              {product.variants.map((v) => (
                <option key={v.sku} value={v.sku}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {activePrice > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
              paddingBottom: "24px",
              borderBottom: "1px solid rgb(227, 232, 220)",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "rgb(122, 181, 54)",
              }}
            >
              {formatPrice(activePrice)}
            </span>
            {activeSalePrice && (
              <span
                style={{
                  fontSize: "18px",
                  color: "rgb(154, 167, 138)",
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(activeOriginalPrice)}
              </span>
            )}
          </div>
        )}

        {/* Cantidad */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "rgb(72, 84, 60)",
            }}
          >
            Cantidad:
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1.5px solid rgb(227, 232, 220)",
              borderRadius: "13px",
              overflow: "hidden",
            }}
          >
            <button
              className="quantity-btn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{
                padding: "10px 14px",
                color: "rgb(122, 181, 54)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "18px",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgb(245, 248, 238)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              −
            </button>
            <span
              style={{
                padding: "10px 16px",
                fontSize: "15px",
                fontWeight: "700",
                color: "rgb(34, 48, 15)",
                minWidth: "40px",
                textAlign: "center",
              }}
            >
              {qty}
            </span>
            <button
              className="quantity-btn"
              onClick={() => setQty((q) => q + 1)}
              style={{
                padding: "10px 14px",
                color: "rgb(122, 181, 54)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "18px",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgb(245, 248, 238)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              +
            </button>
          </div>
        </div>

        {/* Botones */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          <button
            className="add-button"
            onClick={handleAdd}
            style={{
              background: "rgb(122, 181, 54)",
              color: "rgb(255, 255, 255)",
              border: "none",
              fontWeight: "700",
              fontSize: "16px",
              padding: "15px 28px",
              borderRadius: "14px",
              cursor: "pointer",
              boxShadow: "rgba(122, 181, 54, 0.32) 0px 12px 28px",
            }}
          >
            {added ? "✓ Agregado" : "Agregar al carrito"}
          </button>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "rgb(255, 255, 255)",
              color: "rgb(63, 74, 54)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "16px",
              padding: "15px 24px",
              borderRadius: "14px",
              border: "1.5px solid rgb(227, 232, 220)",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgb(122, 181, 54)";
              e.currentTarget.style.color = "rgb(122, 181, 54)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgb(227, 232, 220)";
              e.currentTarget.style.color = "rgb(63, 74, 54)";
            }}
          >
            Cotizar por WhatsApp
          </a>
        </div>

        {/* Características */}
        {product.features && product.features.length > 0 && (
          <div
            style={{
              borderTop: "1px solid rgb(227, 232, 220)",
              paddingTop: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgb(122, 181, 54)",
                marginBottom: "16px",
              }}
            >
              Características principales
            </h3>
            <ul
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {product.features.map((f) => (
                <li
                  key={f}
                  className="feature-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "14.5px",
                    fontWeight: "600",
                    color: "rgb(91, 102, 80)",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "rgb(122, 181, 54)",
                      flexShrink: 0,
                    }}
                  ></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
