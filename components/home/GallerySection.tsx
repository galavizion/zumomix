"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive((i) => (i! > 0 ? i! - 1 : GALLERY_IMAGES.length - 1)), []);
  const next = useCallback(() => setActive((i) => (i! < GALLERY_IMAGES.length - 1 ? i! + 1 : 0)), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
            Nuestros equipos en acción
          </h2>
          <p className="text-neutral-500">
            Instalaciones reales de nuestros clientes en todo México
          </p>
        </div>

        {/* Grid de thumbnails pequeños */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: "block",
                aspectRatio: "1",
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
                padding: 0,
                cursor: "zoom-in",
                background: "#f5f5f5",
              }}
            >
              <Image
                src={src}
                alt={`Equipo Zumomix ${i + 1}`}
                width={160}
                height={160}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </button>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {active !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Imagen */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "88vh" }}
          >
            <Image
              src={GALLERY_IMAGES[active]}
              alt={`Equipo Zumomix ${active + 1}`}
              width={900}
              height={900}
              style={{ maxWidth: "90vw", maxHeight: "85vh", width: "auto", height: "auto", borderRadius: "12px", objectFit: "contain" }}
            />
            <span style={{ position: "absolute", bottom: "-28px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
              {active + 1} / {GALLERY_IMAGES.length}
            </span>
          </div>

          {/* Cerrar */}
          <button
            onClick={close}
            style={{ position: "fixed", top: "18px", right: "22px", background: "none", border: "none", color: "white", fontSize: "32px", cursor: "pointer", lineHeight: 1, opacity: 0.8 }}
          >
            ×
          </button>

          {/* Anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{ position: "fixed", left: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.12)", border: "none", color: "white", fontSize: "26px", cursor: "pointer", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ‹
          </button>

          {/* Siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{ position: "fixed", right: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.12)", border: "none", color: "white", fontSize: "26px", cursor: "pointer", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
