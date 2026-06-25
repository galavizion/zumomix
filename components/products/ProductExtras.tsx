"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductExtra } from "@/lib/productExtras";

const green = "rgb(122, 181, 54)";
const dark = "rgb(34, 48, 15)";
const muted = "rgb(91, 102, 80)";
const border = "rgb(216, 232, 194)";
const light = "rgb(247, 252, 239)";

export default function ProductExtras({ extra }: { extra: ProductExtra }) {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ marginTop: "72px", display: "flex", flexDirection: "column", gap: "64px" }}>

      {/* ===== Promo cross-sell ===== */}
      {extra.promo && (
        <section style={{ background: light, borderRadius: "24px", padding: "40px", display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }}>
          <div>
            {extra.promo.badge && (
              <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: green, display: "block", marginBottom: "10px" }}>
                {extra.promo.badge}
              </span>
            )}
            <h2 style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: "800", color: dark, marginBottom: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2 }}>
              {extra.promo.title}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {extra.promo.bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "rgb(63, 74, 54)" }}>
                  <span style={{ color: green, fontWeight: "700", flexShrink: 0 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href={extra.promo.linkHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: dark, color: "white", textDecoration: "none", fontWeight: "700", fontSize: "14px", padding: "12px 24px", borderRadius: "12px" }}>
              {extra.promo.linkLabel} →
            </Link>
          </div>
          {extra.promo.image && (
            <Image src={extra.promo.image} alt={extra.promo.title} width={180} height={180} style={{ width: "160px", height: "auto", borderRadius: "16px", flexShrink: 0 }} />
          )}
        </section>
      )}

      {/* ===== Benefits grid (iconos/infografías) ===== */}
      {extra.benefits && extra.benefits.length > 0 && (
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
            {extra.benefits.map((b) => (
              <div key={b.title} style={{ background: light, border: `1.5px solid ${border}`, borderRadius: "16px", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center" }}>
                {b.image && (
                  <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="80px"
                    />
                  </div>
                )}
                <p style={{ fontSize: "13px", fontWeight: "700", color: dark, lineHeight: 1.4 }}>{b.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== ¿Por qué somos mejores? ===== */}
      {extra.whyBetterTitle && (
        <div>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "800", color: dark, marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {extra.whyBetterTitle}
          </h2>
          <p style={{ fontSize: "15px", color: muted, marginBottom: "32px" }}>
            La máquina B1 Plus es muy superior a los otros equipos en el mercado. Se ven iguales pero no lo son.
          </p>
        </div>
      )}

      {/* ===== Highlights ===== */}
      {extra.highlights && extra.highlights.length > 0 && (
        <section>
          {!extra.whyBetterTitle && (
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: "800", color: dark, marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Características
            </h2>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {extra.highlights.map((h) => (
              <div key={h.title} style={{ background: "white", border: `1.5px solid ${border}`, borderRadius: "18px", overflow: "hidden" }}>
                {h.image && (
                  <div style={{ background: light, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <Image
                      src={h.image}
                      alt={h.title}
                      width={h.imageWidth ?? 600}
                      height={h.imageHeight ?? 400}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                )}
                {!h.image && (
                  <div style={{ background: light, padding: "20px 20px 0", fontSize: "32px" }}>{h.icon}</div>
                )}
                <div style={{ padding: "20px" }}>
                  {h.image && <div style={{ fontSize: "24px", marginBottom: "8px" }}>{h.icon}</div>}
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: dark, marginBottom: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {h.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: muted, lineHeight: 1.6 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Texto extra ===== */}
      {extra.extraTexts && extra.extraTexts.length > 0 && (
        <section style={{ background: light, borderRadius: "20px", padding: "36px 40px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {extra.extraTexts.map((t) => (
            <p key={t} style={{ fontSize: "15px", color: muted, lineHeight: 1.7 }}>{t}</p>
          ))}
        </section>
      )}

      {/* ===== Testimoniales ===== */}
      {extra.showTestimonials && (
        <section style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: "800", color: dark, marginBottom: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Creando éxito juntos
          </h2>
          <p style={{ fontSize: "15px", color: muted, marginBottom: "32px" }}>Algunos de nuestros clientes satisfechos</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "700px", margin: "0 auto" }}>
            {(extra.testimonials ?? [
              { src: "https://www.zumomix.com/wp-content/uploads/2022/09/296448978_386818933561677_6311962382191161284_n.webp", caption: "Fácil de utilizar y muy atractiva" },
              { src: "https://www.zumomix.com/wp-content/uploads/2022/09/295063155_383948473848723_5212012474698761196_n.webp", caption: "Aguas frescas 100% naturales" },
            ]).map((img) => (
              <div key={img.src}>
                <Image src={img.src} alt={img.caption} width={400} height={400} style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "16px" }} />
                <p style={{ fontSize: "13px", color: muted, marginTop: "10px", fontStyle: "italic" }}>"{img.caption}"</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Videos / Shorts ===== */}
      {extra.videos && extra.videos.length > 0 && (
        <section>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: "800", color: dark, marginBottom: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Mírala en acción
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {extra.videos.map((v) => (
              <div key={v.videoId} style={{ borderRadius: "16px", overflow: "hidden", background: "#000", aspectRatio: "16/9" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.videoId}?controls=1&rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Ficha técnica ===== */}
      {(extra.specs || extra.specTabs) && (
        <section>
          {extra.specTitle && (
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: "800", color: dark, marginBottom: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {extra.specTitle}
            </h2>
          )}

          <div style={{ display: "grid", gridTemplateColumns: extra.specImage ? "1fr 2fr" : "1fr", gap: "32px", alignItems: "start" }}>
            {/* Imagen ficha técnica — izquierda 1/3 */}
            {extra.specImage && (
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: `1.5px solid ${border}` }}>
                <Image
                  src={extra.specImage}
                  alt="Ficha técnica"
                  width={600}
                  height={800}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            )}

            {/* Tabla — derecha 2/3 */}
            <div>
              {/* Tabs (múltiples variantes) */}
              {extra.specTabs && (
                <>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                    {extra.specTabs.map((t, i) => (
                      <button
                        key={t.label}
                        onClick={() => setTab(i)}
                        style={{
                          padding: "10px 24px", borderRadius: "10px", border: "1.5px solid",
                          borderColor: tab === i ? green : border,
                          background: tab === i ? green : "white",
                          color: tab === i ? "white" : "rgb(63, 74, 54)",
                          fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <SpecTable rows={extra.specTabs[tab].rows} />
                </>
              )}

              {/* Tabla simple */}
              {extra.specs && <SpecTable rows={extra.specs} />}
            </div>
          </div>
        </section>
      )}

      {/* ===== Refacciones ===== */}
      {extra.showRefacciones && (
        <section style={{ background: dark, borderRadius: "24px", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "280px" }}>
          {/* Texto — 50% */}
          <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: green }}>
              Soporte Zumomix
            </span>
            <h3 style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: "800", color: "white", lineHeight: 1.25, fontFamily: "'Plus Jakarta Sans', sans-serif", margin: 0 }}>
              Refacciones y taller especializado
            </h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: 0 }}>
              A diferencia de otras marcas, nosotros sí tenemos refacciones para nuestras máquinas. Contamos con un taller especializado para brindarte apoyo ante cualquier problema.
            </p>
            <p style={{ fontSize: "14px", color: green, fontWeight: "700", margin: 0 }}>
              ✓ Siempre contarás con el soporte de Zumomix.
            </p>
          </div>

          {/* Imágenes — 50% */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            {(extra.refaccionesImages ?? []).slice(0, 2).map((src, i) => (
              <div key={i} style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src={src}
                  alt={`Refacciones ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="25vw"
                />
              </div>
            ))}
            {/* Placeholders si no hay imágenes */}
            {(extra.refaccionesImages ?? []).length === 0 && [0, 1].map((i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "280px" }}>
                <span style={{ fontSize: "32px", opacity: 0.3 }}>🔧</span>
              </div>
            ))}
            {(extra.refaccionesImages ?? []).length === 1 && (
              <div style={{ background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "32px", opacity: 0.3 }}>🔧</span>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}

function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div style={{ border: `1.5px solid rgb(216, 232, 194)`, borderRadius: "16px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} style={{ background: i % 2 === 0 ? "white" : "rgb(247, 252, 239)" }}>
              <td style={{ padding: "14px 20px", fontSize: "14px", fontWeight: "700", color: "rgb(63, 74, 54)", width: "40%" }}>{row.label}</td>
              <td style={{ padding: "14px 20px", fontSize: "14px", color: "rgb(91, 102, 80)" }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
