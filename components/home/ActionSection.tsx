"use client";

import { useState } from "react";
import Image from "next/image";
import { CONTACT, PRODUCTS } from "@/lib/constants";

const BLOCKS = [
  {
    slug: "exprimidor-atomic",
    videoId: "ktgUkTHa8ag",
    label: "En acción",
    title: "Exprime jugo de limón sin esfuerzo",
    description: "Mira cómo el Exprimidor Atomic trabaja en piloto automático: rápido, robusto y fácil de operar todos los días.",
  },
  {
    slug: "exprimidora-business-1-plus",
    videoId: "BPLUS_VIDEO_ID",
    label: "En acción",
    title: "Naranjas frescas en segundos",
    description: "La Business 1 Plus procesa hasta 500 naranjas por hora. Ideal para cafeterías, restaurantes y tiendas de jugos naturales.",
  },
];

function VideoBlock({ slug, videoId, label, title, description }: typeof BLOCKS[0]) {
  const [playing, setPlaying] = useState(false);
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const waMessage = encodeURIComponent(`Hola, me interesa el ${product.name}. ¿Podrían darme una cotización?`);
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`;
  const hasVideo = videoId && videoId !== "BPLUS_VIDEO_ID";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.85fr 1.15fr",
        gap: "44px",
        alignItems: "center",
      }}
      className="action-block"
    >
      {/* Texto */}
      <div>
        <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgb(122, 181, 54)" }}>
          {label}
        </span>
        <h2 style={{ fontSize: "38px", fontWeight: "800", color: "rgb(34, 48, 15)", letterSpacing: "-0.02em", margin: "12px 0 16px", lineHeight: "1.1" }}>
          {title}
        </h2>
        <p style={{ fontSize: "16.5px", lineHeight: "1.6", color: "rgb(91, 102, 80)", marginBottom: "24px" }}>
          {description}
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "9px",
            background: "#25D366", color: "white",
            textDecoration: "none", fontWeight: "700", fontSize: "15px",
            padding: "13px 24px", borderRadius: "13px",
            boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
            transition: "background 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.103 1.514 5.832L.057 23.857a.5.5 0 0 0 .609.61l6.101-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.986 0-3.84-.538-5.434-1.476l-.39-.23-4.04.97.988-3.926-.253-.4A9.946 9.946 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Solicitar cotización
        </a>
      </div>

      {/* Video / imagen */}
      <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", aspectRatio: "16/10", background: "linear-gradient(135deg, rgb(43,58,24), rgb(31,42,20))", boxShadow: "rgba(40,60,20,0.22) 0px 28px 56px" }}>
        {playing && hasVideo ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
            title={product.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        ) : (
          <>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: "contain", objectPosition: "right bottom", opacity: 0.92, padding: "0 0 6% 0" }}
              sizes="600px"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(20,28,10,0.7) 30%, rgba(20,28,10,0.1))" }} />
            {hasVideo && (
              <button
                onClick={() => setPlaying(true)}
                style={{
                  position: "absolute", top: "50%", left: "14%",
                  transform: "translateY(-50%)",
                  width: "78px", height: "78px",
                  border: "none", borderRadius: "50%",
                  background: "rgb(122,181,54)", color: "white",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "rgba(0,0,0,0.3) 0px 12px 28px",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
              >
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgb(122,181,54)", animation: "2.4s ease-out 0s infinite pulsering" }} />
                <span style={{ position: "relative", borderLeft: "20px solid white", borderTop: "13px solid transparent", borderBottom: "13px solid transparent", marginLeft: "5px" }} />
              </button>
            )}
            <div style={{ position: "absolute", left: "14%", bottom: "9%", color: "white", fontWeight: "700", fontSize: "17px", maxWidth: "60%", lineHeight: "1.25" }}>
              {product.name}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ActionSection() {
  return (
    <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "84px 28px" }}>
      <style>{`
        @media (max-width: 768px) {
          .action-block { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
        {BLOCKS.map((block) => (
          <VideoBlock key={block.slug} {...block} />
        ))}
      </div>
    </section>
  );
}
