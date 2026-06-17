"use client";

import { useState, useEffect } from "react";
import { PRODUCTS } from "@/lib/constants";

export interface CarouselItem {
  productId: string;
  badge: string;
}

export const DEFAULT_CAROUSEL: CarouselItem[] = [
  { productId: "1", badge: "Más vendido" },
  { productId: "4", badge: "Potencia superior" },
  { productId: "6", badge: "Granita Profesional" },
];

export default function HeroCarousel({ items }: { items?: CarouselItem[] }) {
  const slides = (items && items.length > 0 ? items : DEFAULT_CAROUSEL)
    .map((item) => ({
      ...item,
      product: PRODUCTS.find((p) => p.id === item.productId),
    }))
    .filter((s) => !!s.product);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4200);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stack de slides — usan posición relativa en el primero para darle altura al contenedor */}
      <div style={{ position: "relative" }}>
        {slides.map(({ product, badge }, i) => (
          <div
            key={i}
            style={{
              position: i === 0 ? "relative" : "absolute",
              inset: i === 0 ? undefined : 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.75s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {/* Imagen */}
            <div style={{ textAlign: "center", padding: "18px 18px 56px" }}>
              <img
                src={product!.images[0]}
                alt={product!.name}
                style={{
                  width: "78%",
                  maxWidth: "360px",
                  height: "auto",
                  display: "inline-block",
                  animation:
                    i === current
                      ? "6s ease-in-out 0s infinite normal none running floaty"
                      : "none",
                  filter: "drop-shadow(rgba(40, 60, 20, 0.18) 0px 28px 40px)",
                  borderRadius: "20px",
                }}
              />
            </div>

            {/* Badge flotante */}
            <div
              style={{
                position: "absolute",
                bottom: "32px",
                left: "0px",
                background: "rgb(255, 255, 255)",
                border: "1px solid rgb(238, 241, 234)",
                borderRadius: "16px",
                padding: "13px 18px",
                boxShadow: "rgba(40, 60, 20, 0.12) 0px 16px 30px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                opacity: i === current ? 1 : 0,
                transform: i === current ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.75s ease 0.2s, transform 0.75s ease 0.2s",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  width: "38px",
                  height: "38px",
                  borderRadius: "11px",
                  background: "rgb(232, 245, 216)",
                  color: "rgb(122, 181, 54)",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "15px",
                  flexShrink: 0,
                }}
              >
                ★
              </span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "rgb(34, 48, 15)", whiteSpace: "nowrap" }}>
                  {badge}
                </div>
                <div style={{ fontSize: "12px", color: "rgb(124, 135, 114)", whiteSpace: "nowrap" }}>
                  {product!.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
            alignItems: "center",
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "22px" : "7px",
                height: "7px",
                borderRadius: "999px",
                background: i === current ? "rgb(122, 181, 54)" : "rgb(207, 227, 176)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.35s ease, background 0.25s ease",
              }}
              aria-label={`Producto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
