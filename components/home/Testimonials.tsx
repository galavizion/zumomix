"use client";

import { useState } from "react";
import { useHomeData } from "@/hooks/useHomeData";

type Review = {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  rating: number;
  comment: string;
};

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "MARISCOS GUERO",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUYv8MoG7Q2o_F4DCStOENAMO2C52rC96jCe56YqlSKP4DSXOg=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 8 meses",
    rating: 5,
    comment: "Excelente atención, son una empresa muy comprometida. Me encantó que a pesar de no haber comprado un equipo con ellos, me dieron la oportunidad de darle mantenimiento. Atención de 10, respuesta de 10, eficacia en la entrega de 10. El equipo llegó en excelente estado muy rápido.",
  },
  {
    id: "2",
    author: "Alejandro Chicho",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKpejPPUH70xc7FHPlX0Xh3Ir_sNBpRBwD5mNYd9t0C-yNiRQ=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 10 meses",
    rating: 5,
    comment: "Excelentes productos. Máquina de limón 100% calada. Empecé a ahorrar 30 kg de limón a la semana.",
  },
  {
    id: "3",
    author: "Ruly Ruly",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLn7481OiQLWb-zUeG_WZZJS5qMTozHKAY6aqPyayp2qk_2rg=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 10 meses",
    rating: 5,
    comment: "Excelente atención, llegamos buscando la máquina exprimidora de limones y naranjas y el personal solucionó todas nuestras dudas. Nos mandaron las máquinas hasta Mexicali, Baja California. Recomendados al 100.",
  },
  {
    id: "4",
    author: "CUATLAXAHUE",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocInkBO_ccmXy1muXv57dR3mkpq_kfU0KbZ5ij1EZaOfxFHthg=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 11 meses",
    rating: 5,
    comment: "Excelente atención, muy bueno explicando, eficaz, 100% confiable. Fuimos desde Puerto Vallarta a Guadalajara por dos máquinas, y todo excelente.",
  },
  {
    id: "5",
    author: "Julio Martin Moreno",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUbBwGRLfY5d9-VGbKeahfxVLja-henmuBuw7EC4cohyPMH0g33NQ=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Excelente servicio, yo pasé por la máquina a las oficinas y tienen refacciones y máquinas en exhibición. 100% recomendados.",
  },
  {
    id: "6",
    author: "Daniel Palomares",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX8WRAwRKF5sv6ccNKxiUrTyI3ataAqFptdT8k-eRrJh3F7G3yz8g=w64-h64-c-rp-mo-ba3-br100",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Muy buena atención por parte de Oscar y excelente equipo. Compra rápida, envío y llegada a Torreón.",
  },
  {
    id: "7",
    author: "Berenice Gonzalez",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjULgGFrk4zCoUygh3G1fh4i71GhnEvn0MovemfksAyeockhoAgu=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Excelente servicio, no es fraude, son muy confiables, entregan súper rápido. Llevo 5 máquinas y todas son excelentes, muy amables y serviciales.",
  },
  {
    id: "8",
    author: "Angel Leon",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVfjwnDATWqeUU8fAnQqrmKtITIJLrL1ZOMeOTKctcEJ-QteXAtGQ=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Excelente atención, llegan súper rápido. No he tenido detalle en ninguna de las máquinas, son muy seguros.",
  },
  {
    id: "9",
    author: "Miguel Reyes",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUe-0QplaUDKkhxCDTaGvlTXnWlkd3HLXschsIRVEH5S_8U8x_M=w64-h64-c-rp-mo-br100",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Platiqué directo con Oscar para comprar una máquina y el tiempo de respuesta fue excelente. En una semana ya tenía la máquina funcionando. 👍",
  },
  {
    id: "10",
    author: "VICTOR MARINO MARTINEZ",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUEdSlOQPv3zueGg5iQiv3q8GenMuIoesN61rbTWmWzaR7r6Bg=w64-h64-c-rp-mo-ba4-br100",
    timeAgo: "hace 2 años",
    rating: 5,
    comment: "Excelente producto para exprimir limones, fácil de usar y limpiar. La atención brindada fue muy buena, recomendaría al 100% este producto. NO ES FRAUDE, compramos dos productos para entregas diferentes y llegó en tiempo y forma en ambas.",
  },
];

const PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(REVIEWS.length / PER_PAGE);

const GoogleIcon = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="https://cdn.trustindex.io/assets/platform/Google/icon.svg"
    alt="Google"
    width={20}
    height={20}
  />
);

export default function Testimonials() {
  const { data } = useHomeData();
  const [page, setPage] = useState(0);

  const testimonialsData = data.testimonials?.content || {
    title: "Lo que dicen nuestros clientes",
    subtitle: "Reseñas de Google",
  };

  const prev = () => setPage((p) => (p - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  const next = () => setPage((p) => (p + 1) % TOTAL_PAGES);

  return (
    <section
      id="resenas"
      style={{
        background: "rgb(251, 252, 249)",
        borderTop: "1px solid rgb(240, 242, 235)",
        borderBottom: "1px solid rgb(240, 242, 235)",
        marginTop: "70px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 28px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "46px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgb(122,181,54)" }}>
            {testimonialsData.subtitle}
          </span>
          <h2 style={{ fontSize: "40px", fontWeight: 800, color: "rgb(34,48,15)", letterSpacing: "-0.02em", margin: "12px 0 0" }}>
            {testimonialsData.title}
          </h2>
        </div>

        {/* Slider */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div
            style={{
              display: "flex",
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              transform: `translateX(-${page * 100}%)`,
            }}
          >
            {Array.from({ length: TOTAL_PAGES }).map((_, pageIdx) => (
              <div
                key={pageIdx}
                style={{
                  flexShrink: 0,
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }}
              >
                {REVIEWS.slice(pageIdx * PER_PAGE, (pageIdx + 1) * PER_PAGE).map((review) => (
                  <div
                    key={review.id}
                    style={{
                      background: "#fff",
                      border: "1px solid rgb(237,240,232)",
                      borderRadius: "20px",
                      padding: "28px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "16px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={review.avatar}
                        alt={review.author}
                        width={46}
                        height={46}
                        style={{ borderRadius: "50%", flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "rgb(34,48,15)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {review.author}
                        </div>
                        <div style={{ fontSize: "12.5px", color: "rgb(154,167,138)" }}>
                          {review.timeAgo}
                        </div>
                      </div>
                      <GoogleIcon />
                    </div>

                    {/* Stars */}
                    <div style={{ color: "rgb(245,166,35)", fontSize: "16px", letterSpacing: "2px", marginBottom: "12px" }}>
                      {"★".repeat(review.rating)}
                    </div>

                    {/* Comment */}
                    <p style={{ fontSize: "14.5px", lineHeight: "1.62", color: "rgb(91,102,80)", margin: 0 }}>
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "36px" }}>
          <button
            onClick={prev}
            aria-label="Anterior"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "1.5px solid rgb(207,227,176)", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "18px", color: "rgb(122,181,54)",
              transition: "background 0.2s",
            }}
          >
            ‹
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: "8px" }}>
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Página ${i + 1}`}
                style={{
                  width: i === page ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  background: i === page ? "rgb(122,181,54)" : "rgb(207,227,176)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "1.5px solid rgb(207,227,176)", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "18px", color: "rgb(122,181,54)",
              transition: "background 0.2s",
            }}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
