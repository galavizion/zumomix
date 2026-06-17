"use client";

import { useHomeData } from "@/hooks/useHomeData";

export default function PromoBar() {
  const { data } = useHomeData();

  const promoData = data.promo?.content || {
    text: "Promoción de temporada · hasta",
    discount: "20% OFF",
    description: "en equipos seleccionados",
  };

  return (
    <div
      data-dc-tpl="24"
      style={{
        background: "rgb(232, 245, 216)",
        color: "rgb(58, 92, 28)",
        fontSize: "13.5px",
        fontWeight: "600",
        textAlign: "center",
        padding: "9px 16px",
        letterSpacing: "0.01em",
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      {promoData.text}{" "}
      <span data-dc-tpl="25" style={{ color: "rgb(224, 112, 12)" }}>
        {promoData.discount}
      </span>{" "}
      {promoData.description}
    </div>
  );
}
