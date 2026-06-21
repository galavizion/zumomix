import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONCENTRADOS_FLAVORS, CONTACT, PRESENTACIONES_CONCENTRADOS } from "@/lib/constants";
import SaboresAcordeon from "@/components/concentrados/SaboresAcordeon";

export const metadata: Metadata = {
  title: "Concentrados naturales",
  description: "Más de 30 sabores de concentrados naturales para aguas frescas. Fresa-kiwi, pepino-limón, mango, maracuyá y más.",
};

export default function ConcentradosPage() {
  const waMessage = encodeURIComponent("Hola, me interesa cotizar concentrados naturales Zumomix.");

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>

      {/* ===== Hero ===== */}
      <section className="page-hero">
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "60px 28px 56px" }}>
          <div className="concentrados-hero-grid">
            {/* Texto */}
            <div>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "white",
                border: "1px solid rgb(216, 232, 194)",
                color: "rgb(122, 181, 54)",
                fontSize: "13px",
                fontWeight: "600",
                padding: "7px 14px",
                borderRadius: "999px",
                marginBottom: "22px",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgb(122, 181, 54)", display: "inline-block" }}></span>
                +30 sabores disponibles
              </span>

              <h1 style={{
                fontSize: "clamp(32px, 4.5vw, 50px)",
                fontWeight: "800",
                color: "rgb(34, 48, 15)",
                letterSpacing: "-0.02em",
                lineHeight: 1.06,
                marginBottom: "18px",
              }}>
                Concentrados<br />
                <span style={{ color: "rgb(122, 181, 54)" }}>naturales</span> para<br />
                aguas frescas
              </h1>

              <p style={{ fontSize: "17px", color: "rgb(91, 102, 80)", lineHeight: 1.65, marginBottom: "32px", maxWidth: "440px" }}>
              Más de 30 sabores diferentes para ti
Fresa-Kiwi, pepino-limón, mango, maracuyá y muchos más.

Hoy las personas cuidan mucho más lo que consumen. Ofrece a tus clientes aguas frescas y naturales. Ideales para restaurantes, mixología, bares, repostería, hoteles, etc.

<ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {[
                  { icon: "🍶", text: "Presentación de litro." },
                  { icon: "📦", text: "Se surten en cajas de 24 litros y pueden ser mezclados los sabores." },
                  { icon: "🚚", text: "Se envían a toda la república." },
                  { icon: "🏆", text: "Ofrece calidad premium y sabores exóticos." },
                ].map((item) => (
                  <li key={item.text} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", color: "rgb(63, 74, 54)" }}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul></p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                    background: "rgb(122, 181, 54)",
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "16px",
                    padding: "15px 28px",
                    borderRadius: "14px",
                    boxShadow: "rgba(122, 181, 54, 0.32) 0px 12px 28px",
                  }}
                >
                  Cotizar concentrados →
                </a>
                <Link
                  href="#sabores"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "white",
                    color: "rgb(63, 74, 54)",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "16px",
                    padding: "15px 24px",
                    borderRadius: "14px",
                    border: "1.5px solid rgb(227, 232, 220)",
                  }}
                >
                  Ver sabores
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: "30px", marginTop: "40px", flexWrap: "wrap" }}>
                {[
                  { num: "+30", label: "sabores únicos" },
                  { num: "100%", label: "fruta natural" },
                  { num: "MX", label: "envíos nacionales" },
                ].map((stat, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: "800", color: "rgb(34, 48, 15)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.num}</div>
                      <div style={{ fontSize: "13px", color: "rgb(124, 135, 114)" }}>{stat.label}</div>
                    </div>
                    {i < arr.length - 1 && <div style={{ width: 1, height: 32, background: "rgb(216, 232, 194)" }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                inset: "8%",
                background: "radial-gradient(circle at 50% 40%, rgb(232, 245, 216), rgb(243, 249, 234) 70%)",
                borderRadius: "50%",
                filter: "blur(2px)",
                animation: "blobpulse 4s ease-in-out infinite",
              }} />
              <div style={{ position: "relative", textAlign: "center", padding: "16px" }}>
                <Image
                  src="/img/concentrados/concentrados-hielo.jpg"
                  alt="Concentrados naturales Zumomix"
                  width={420}
                  height={420}
                  style={{
                    width: "80%",
                    height: "auto",
                    display: "inline-block",
                    borderRadius: "20px",
                    animation: "6s ease-in-out 0s infinite normal none running floaty",
                    filter: "drop-shadow(rgba(40, 60, 20, 0.18) 0px 28px 40px)",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== Presentaciones ===== */}
      <section style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 28px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.015em",
              marginBottom: "10px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Presentaciones disponibles
            </h2>
            <p style={{ fontSize: "16px", color: "rgb(124, 135, 114)" }}>
              Elige el tamaño ideal para el volumen de tu negocio
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            maxWidth: "720px",
            margin: "0 auto",
          }}>
            {PRESENTACIONES_CONCENTRADOS.map((p) => (
              <div
                key={p.title}
                style={{
                  background: "white",
                  border: "1.5px solid rgb(216, 232, 194)",
                  borderRadius: "20px",
                  padding: "28px 24px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                className="product-card-new"
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "rgb(232, 245, 216)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  marginBottom: "16px",
                }}>
                  🧃
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "rgb(34, 48, 15)", marginBottom: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "14px", color: "rgb(124, 135, 114)", marginBottom: "16px", lineHeight: 1.5 }}>
                  {p.description}
                </p>
                <span style={{
                  display: "inline-block",
                  background: "rgb(232, 245, 216)",
                  color: "rgb(72, 100, 30)",
                  fontSize: "12.5px",
                  fontWeight: "600",
                  padding: "5px 14px",
                  borderRadius: "999px",
                }}>
                  {p.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      
      {/* ===== Dispensadora MIX3 ===== */}
      <section style={{ padding: "72px 0", background: "rgb(247, 252, 239)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 28px" }}>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "700", color: "rgb(34, 48, 15)", marginBottom: "40px", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Dispensadora de aguas frescas MIX3 y concentrados de fruta natural
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { icon: "🧃", text: "Tanques de 18 lts para 3 sabores distintos." },
                  { icon: "❄️", text: "Enfría tus bebidas entre 7 a 12 grados centígrados." },
                  { icon: "🔄", text: "Sistema giratorio para mantener tus aguas frescas." },
                ].map((item) => (
                  <li key={item.text} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "16px", color: "rgb(63, 74, 54)" }}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.zumomix.com/dispensadora-de-aguas-frescas-mix-3/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgb(200, 30, 30)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "15px",
                  padding: "14px 28px",
                  borderRadius: "12px",
                }}
              >
                Conoce más de la Dispensadora →
              </a>
            </div>
            <div>
              <Image
                src="https://www.zumomix.com/wp-content/uploads/2022/10/Diseno-sin-titulo-e1664756961677.png"
                alt="MIXER 3 dispensador de aguas frescas"
                width={700}
                height={601}
                style={{ width: "100%", height: "auto", borderRadius: "16px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Catálogo de sabores (acordeón) ===== */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 28px" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "700", color: "rgb(34, 48, 15)", marginBottom: "12px", textAlign: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Aquí empieza la magia de los sabores
          </h2>
          <p style={{ fontSize: "16px", color: "rgb(124, 135, 114)", textAlign: "center", marginBottom: "40px" }}>
            Consulta nuestro catálogo completo de sabores
          </p>
          <SaboresAcordeon />
        </div>
      </section>

    

      {/* ===== Creando éxito juntos + Videos ===== */}
      <section style={{ padding: "72px 0", background: "rgb(247, 252, 239)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 28px" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "700", color: "rgb(34, 48, 15)", marginBottom: "12px", textAlign: "center", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Creando éxito juntos
          </h2>
          <p style={{ fontSize: "16px", color: "rgb(124, 135, 114)", textAlign: "center", marginBottom: "40px" }}>
            Algunos de nuestros clientes satisfechos
          </p>

          {/* Galería + Videos */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "40px" }}>
            <Image
              src="https://www.zumomix.com/wp-content/uploads/2022/09/296448978_386818933561677_6311962382191161284_n.webp"
              alt="Fácil de utilizar y muy atractiva"
              width={600}
              height={799}
              style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "16px" }}
            />
            <div style={{ borderRadius: "16px", overflow: "hidden", height: "300px" }}>
              <iframe
                src="https://www.youtube.com/embed/_6D6MDe7WuA"
                title="Aguas frescas la tostada"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div style={{ borderRadius: "16px", overflow: "hidden", height: "300px" }}>
              <iframe
                src="https://www.youtube.com/embed/pOOCuhL-dXI"
                title="Concentrados de aguas frescas"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

       
        </div>
      </section>

  {/* ===== CTA final ===== */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 28px" }}>
          <div style={{
            background: "linear-gradient(135deg, rgb(34, 48, 15) 0%, rgb(72, 100, 30) 100%)",
            borderRadius: "24px",
            padding: "clamp(40px, 6vw, 72px) clamp(28px, 5vw, 72px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "28px",
          }}>
            <div>
              <h2 style={{
                fontSize: "clamp(24px, 3.5vw, 38px)",
                fontWeight: "800",
                color: "white",
                marginBottom: "12px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                Lleva los mejores sabores a tu negocio
              </h2>
              <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", maxWidth: "480px" }}>
                Envío a toda la República Mexicana. Contacta a nuestros asesores para precios por volumen.
              </p>
            </div>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  background: "rgb(122, 181, 54)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "16px",
                  padding: "15px 32px",
                  borderRadius: "14px",
                  boxShadow: "rgba(122, 181, 54, 0.4) 0px 12px 28px",
                }}
              >
                Solicitar cotización →
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  padding: "15px 28px",
                  borderRadius: "14px",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                }}
              >
                Enviar email
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ===== Sabores ===== */}
      <section id="sabores" style={{ padding: "72px 0", background: "rgb(247, 252, 239)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 28px" }}>


             {/* Video MIX3 centrado */}
          <div style={{ maxWidth: "720px", margin: "0 auto", borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9" }}>
            <iframe
              src="https://www.youtube.com/embed/QdVqXuLndig"
              title="MIX3 Distribuidores"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ width: "100%", height: "100%" }}
            />
          </div>


          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.015em",
              marginBottom: "10px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Sabores disponibles
            </h2>
            <p style={{ fontSize: "16px", color: "rgb(124, 135, 114)" }}>
              Selección premium de más de 30 sabores naturales
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", maxWidth: "900px", margin: "0 auto" }}>
            {CONCENTRADOS_FLAVORS.map((flavor) => (
              <span key={flavor} className="flavor-pill">
                {flavor}
              </span>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
}
