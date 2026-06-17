"use client";

import { useState } from "react";
import { CONTACT, PRODUCTS } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactoClient() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", producto: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  const waMessage = encodeURIComponent("Hola, tengo una pregunta sobre los equipos Zumomix.");

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="page-hero">
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "60px 28px 56px" }}>
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
            marginBottom: "20px",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgb(122, 181, 54)", display: "inline-block" }} />
            Respondemos en menos de 24h
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: "800",
            color: "rgb(34, 48, 15)",
            letterSpacing: "-0.02em",
            lineHeight: 1.06,
            marginBottom: "14px",
          }}>
            Hablemos de tu<br />
            <span style={{ color: "rgb(122, 181, 54)" }}>negocio</span>
          </h1>
          <p style={{ fontSize: "17px", color: "rgb(91, 102, 80)", lineHeight: 1.6, maxWidth: "480px" }}>
            Estamos aquí para ayudarte a encontrar el equipo ideal. Cotizaciones sin compromiso.
          </p>
        </div>
      </section>

      {/* Cuerpo: Formulario + Info */}
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "56px 28px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "48px",
          alignItems: "start",
        }} className="contacto-grid">

          {/* ===== Formulario ===== */}
          <div>
            {sent ? (
              <div style={{
                background: "rgb(247, 252, 239)",
                border: "1.5px solid rgb(216, 232, 194)",
                borderRadius: "24px",
                padding: "56px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
              }}>
                <div style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "rgb(232, 245, 216)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <CheckCircle size={34} color="rgb(122, 181, 54)" />
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: "rgb(34, 48, 15)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  ¡Mensaje enviado!
                </h2>
                <p style={{ fontSize: "15px", color: "rgb(124, 135, 114)", maxWidth: "340px", lineHeight: 1.6 }}>
                  Gracias, {form.nombre}. Te contactaremos en menos de 24 horas por email o teléfono.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: "8px",
                    padding: "11px 24px",
                    borderRadius: "12px",
                    border: "1.5px solid rgb(216, 232, 194)",
                    background: "white",
                    color: "rgb(72, 84, 60)",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "13.5px", fontWeight: "600", color: "rgb(72, 84, 60)" }}>
                      Nombre completo *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.nombre}
                      onChange={update("nombre")}
                      placeholder="Juan García"
                      className="contact-input"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "13.5px", fontWeight: "600", color: "rgb(72, 84, 60)" }}>
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="juan@empresa.com"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13.5px", fontWeight: "600", color: "rgb(72, 84, 60)" }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={update("telefono")}
                    placeholder="81 1234 5678"
                    className="contact-input"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13.5px", fontWeight: "600", color: "rgb(72, 84, 60)" }}>
                    Producto de interés
                  </label>
                  <select
                    value={form.producto}
                    onChange={update("producto")}
                    className="contact-input"
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">Selecciona un producto</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Concentrados">Concentrados naturales</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13.5px", fontWeight: "600", color: "rgb(72, 84, 60)" }}>
                    Mensaje *
                  </label>
                  <textarea
                    required
                    value={form.mensaje}
                    onChange={update("mensaje")}
                    rows={5}
                    placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                    className="contact-input"
                    style={{ resize: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: loading ? "rgb(170, 200, 120)" : "rgb(122, 181, 54)",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "16px",
                    padding: "16px 32px",
                    borderRadius: "14px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "rgba(122, 181, 54, 0.32) 0px 12px 28px",
                    transition: "background 0.2s",
                  }}
                >
                  <Send size={18} />
                  {loading ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>

          {/* ===== Info de contacto ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Card info */}
            <div style={{
              background: "linear-gradient(145deg, rgb(34, 48, 15), rgb(60, 84, 24))",
              borderRadius: "24px",
              padding: "32px 28px",
              color: "white",
            }}>
              <h2 style={{
                fontSize: "20px",
                fontWeight: "800",
                marginBottom: "24px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                Información de contacto
              </h2>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
                <li>
                  <a href={`mailto:${CONTACT.email}`} style={{ display: "flex", alignItems: "flex-start", gap: "14px", textDecoration: "none", color: "white" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "12px", background: "rgba(122,181,54,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail size={17} color="rgb(162, 210, 100)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Email</div>
                      <div style={{ fontSize: "14.5px", fontWeight: "600" }}>{CONTACT.email}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phoneMonterrey}`} style={{ display: "flex", alignItems: "flex-start", gap: "14px", textDecoration: "none", color: "white" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "12px", background: "rgba(122,181,54,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Phone size={17} color="rgb(162, 210, 100)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Monterrey</div>
                      <div style={{ fontSize: "14.5px", fontWeight: "600" }}>{CONTACT.phoneMonterrey}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phoneGuadalajara}`} style={{ display: "flex", alignItems: "flex-start", gap: "14px", textDecoration: "none", color: "white" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "12px", background: "rgba(122,181,54,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Phone size={17} color="rgb(162, 210, 100)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Guadalajara</div>
                      <div style={{ fontSize: "14.5px", fontWeight: "600" }}>{CONTACT.phoneGuadalajara}</div>
                    </div>
                  </a>
                </li>
              </ul>

              {/* Redes */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", marginTop: "24px" }}>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>Síguenos</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a href="https://www.instagram.com/zumomix.mx" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.2s" }}>
                    Instagram — {CONTACT.instagram}
                  </a>
                  <a href="https://www.facebook.com/ZumomixExprimidores" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.2s" }}>
                    Facebook — {CONTACT.facebook}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div style={{
              background: "rgb(247, 252, 239)",
              border: "1.5px solid rgb(216, 232, 194)",
              borderRadius: "20px",
              padding: "24px",
            }}>
              <p style={{ fontSize: "14px", fontWeight: "700", color: "rgb(34, 48, 15)", marginBottom: "6px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ¿Necesitas cotización rápida?
              </p>
              <p style={{ fontSize: "13.5px", color: "rgb(124, 135, 114)", marginBottom: "18px", lineHeight: 1.5 }}>
                Escríbenos por WhatsApp y te respondemos en minutos.
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  background: "#25D366",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "15px",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.103 1.514 5.832L.057 23.857a.5.5 0 0 0 .609.61l6.101-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.986 0-3.84-.538-5.434-1.476l-.39-.23-4.04.97.988-3.926-.253-.4A9.946 9.946 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
