"use client";

import { useHomeData } from "@/hooks/useHomeData";

export default function PromoBar() {
  const { data } = useHomeData();

  const promo = data.promo?.content ?? {};

  // Si el toggle "active" existe y está en false, no mostrar
  if ("active" in promo && !promo.active) return null;

  const text = promo.text ?? "Promoción de temporada · hasta";
  const showDiscount = !("showDiscount" in promo) || promo.showDiscount;
  const discount = promo.discount ?? "20% OFF";
  const description = promo.description ?? "en equipos seleccionados";

  return (
    <div
      style={{
        background: "rgb(254, 240, 220)",
        color: "rgb(150, 70, 10)",
        fontSize: "13.5px",
        fontWeight: "600",
        textAlign: "center",
        padding: "9px 16px",
        letterSpacing: "0.01em",
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      {text}
      {showDiscount && discount && (
        <>
          {" "}
          <span style={{ color: "rgb(244, 130, 31)", fontWeight: 800 }}>{discount}</span>
        </>
      )}
      {description && <> {description}</>}
    </div>
  );
}
