"use client";
import { useState } from "react";
import Image from "next/image";

const ITEMS = [
  {
    label: "Lista de Sabores Sencillos",
    src: "https://www.zumomix.com/wp-content/uploads/2022/10/sabores-sencillos.jpg",
    width: 787,
    height: 1306,
    alt: "Lista de sabores sencillos Zumomix",
  },
  {
    label: "Lista de Sabores Mezclados",
    src: "https://www.zumomix.com/wp-content/uploads/2022/10/sabores-mezclados.jpg",
    width: 918,
    height: 660,
    alt: "Lista de sabores mezclados Zumomix",
  },
];

export default function SaboresAcordeon() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "860px", margin: "0 auto" }}>
      {ITEMS.map((item, i) => (
        <div
          key={item.label}
          style={{
            border: "1.5px solid rgb(216, 232, 194)",
            borderRadius: "16px",
            overflow: "hidden",
            background: "white",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "700", color: "rgb(34, 48, 15)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {item.label}
            </span>
            <span style={{
              fontSize: "20px",
              color: "rgb(122, 181, 54)",
              transition: "transform 0.3s",
              display: "inline-block",
              transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
              flexShrink: 0,
            }}>
              +
            </span>
          </button>

          {open === i && (
            <div style={{ padding: "0 24px 24px" }}>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
