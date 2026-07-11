"use client";

import Image from "next/image";
import { PRODUCTS, CONTACT } from "@/lib/constants";
import { useState } from "react";

export default function ContactSection({ logoUrl }: { logoUrl?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          product: "",
          message: "",
        });
        alert("¡Mensaje enviado! Te contactaremos pronto.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar el mensaje");
    } finally {
      setIsSubmitting(false);
    }
  };

  const productOptions = [
    { value: "business-1", label: "Máquina Business 1" },
    { value: "business-2", label: "Máquina Business 2" },
    { value: "pro-1", label: "Exprimidor Pro 1" },
    { value: "granita", label: "Granita / Frappés" },
    { value: "atomic", label: "Exprimidor Atomic" },
    { value: "mix", label: "Dispensador MIX2 / MIX3" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <section
      data-dc-tpl="122"
      id="contacto"
      style={{
        maxWidth: "1180px",
        margin: "0px auto",
        padding: "84px 28px",
      }}
    >
      <div
        data-dc-tpl="123"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "50px",
        }}
      >
        <div
          data-dc-tpl="124"
          data-reveal=""
          style={{
            animationDuration: "0.75s",
            animationTimingFunction: "ease",
            animationDelay: "0s",
            animationIterationCount: "1",
            animationDirection: "normal",
            animationFillMode: "both",
            animationPlayState: "running",
            animationName: "revup",
            animationTimeline: "view()",
            animationRange: "entry cover 26%",
            opacity: 1,
            transform: "translateY(0px)",
            transitionDelay: "0ms",
          }}
        >
          <span
            data-dc-tpl="125"
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgb(122, 181, 54)",
            }}
          >
            Contáctanos
          </span>
          <h2
            data-dc-tpl="126"
            style={{
              fontSize: "38px",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.02em",
              margin: "12px 0px 10px",
            }}
          >
            Cotiza tu equipo hoy
          </h2>
          <p
            data-dc-tpl="127"
            style={{
              fontSize: "16px",
              color: "rgb(107, 117, 96)",
              marginBottom: "30px",
            }}
          >
            Déjanos tus datos y un asesor te contacta el mismo día.
          </p>
          <form
            data-dc-tpl="128"
            style={{
              display: "grid",
              gap: "14px",
            }}
            onSubmit={handleSubmit}
          >
            <input
              data-dc-tpl="129"
              type="text"
              name="name"
              placeholder="Nombre completo"
              className="scp8"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                fontFamily: "inherit",
                fontSize: "15px",
                padding: "14px 16px",
                border: "1.5px solid rgb(227, 232, 220)",
                borderRadius: "13px",
                background: "rgb(255, 255, 255)",
                color: "rgb(63, 74, 54)",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
            <div
              data-dc-tpl="130"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <input
                data-dc-tpl="131"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="scp8"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  fontFamily: "inherit",
                  fontSize: "15px",
                  padding: "14px 16px",
                  border: "1.5px solid rgb(227, 232, 220)",
                  borderRadius: "13px",
                  background: "rgb(255, 255, 255)",
                  color: "rgb(63, 74, 54)",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
              <input
                data-dc-tpl="132"
                type="tel"
                name="phone"
                placeholder="Teléfono"
                className="scp8"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  fontFamily: "inherit",
                  fontSize: "15px",
                  padding: "14px 16px",
                  border: "1.5px solid rgb(227, 232, 220)",
                  borderRadius: "13px",
                  background: "rgb(255, 255, 255)",
                  color: "rgb(63, 74, 54)",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
            </div>
            <select
              data-dc-tpl="133"
              name="product"
              className="scp8"
              value={formData.product}
              onChange={handleChange}
              required
              style={{
                fontFamily: "inherit",
                fontSize: "15px",
                padding: "14px 16px",
                border: "1.5px solid rgb(227, 232, 220)",
                borderRadius: "13px",
                background: "rgb(255, 255, 255)",
                color: "rgb(63, 74, 54)",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <option value="">Selecciona un producto</option>
              {productOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <textarea
              data-dc-tpl="136"
              name="message"
              placeholder="Mensaje"
              rows={4}
              className="scp8"
              value={formData.message}
              onChange={handleChange}
              style={{
                fontFamily: "inherit",
                fontSize: "15px",
                padding: "14px 16px",
                border: "1.5px solid rgb(227, 232, 220)",
                borderRadius: "13px",
                background: "rgb(255, 255, 255)",
                color: "rgb(63, 74, 54)",
                outline: "none",
                resize: "vertical",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
            <button
              data-dc-tpl="137"
              type="submit"
              disabled={isSubmitting}
              className="scp9"
              style={{
                fontFamily: "inherit",
                justifySelf: "start",
                background: "rgb(122, 181, 54)",
                color: "rgb(255, 255, 255)",
                border: "none",
                fontWeight: "700",
                fontSize: "16px",
                padding: "15px 34px",
                borderRadius: "13px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: "rgba(122, 181, 54, 0.3) 0px 12px 26px",
                transition: "transform 0.2s, box-shadow 0.2s",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
        <div
          data-dc-tpl="138"
          data-reveal=""
          data-delay="100"
          style={{
            animationDuration: "0.75s",
            animationTimingFunction: "ease",
            animationDelay: "0s",
            animationIterationCount: "1",
            animationDirection: "normal",
            animationFillMode: "both",
            animationPlayState: "running",
            animationName: "revup",
            animationTimeline: "view()",
            animationRange: "entry cover 26%",
            background: "rgb(245, 158, 11)",
            borderRadius: "24px",
            padding: "38px",
            color: "rgb(255, 235, 210)",
            alignSelf: "start",
            opacity: 1,
            transform: "translateY(0px)",
            transitionDelay: "100ms",
          }}
        >
          <div style={{ marginBottom: "22px" }}>
            {logoUrl ? (
              <Image src={logoUrl} alt="Zumomix" width={160} height={60} style={{ objectFit: "contain", objectPosition: "left", maxHeight: "60px", width: "auto" }} />
            ) : (
              <span style={{ fontSize: "25px", fontWeight: "800", letterSpacing: "-0.02em", color: "rgb(255, 255, 255)" }}>
                zumo<span style={{ color: "rgb(255, 220, 150)" }}>mix</span>
              </span>
            )}
          </div>
          <p
            data-dc-tpl="141"
            style={{
              fontSize: "14.5px",
              lineHeight: "1.65",
              color: "rgb(255, 225, 185)",
              marginBottom: "26px",
            }}
          >
            Zumomix es una marca especializada en equipos y herramientas profesionales para negocios. Robustos y a un precio accesible, con clientes en toda la república mexicana.
          </p>
          <div
            data-dc-tpl="142"
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            <div
              data-dc-tpl="143"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
              }}
            >
              <span
                data-dc-tpl="144"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "rgb(255, 220, 150)",
                }}
              ></span>
              <span
                data-dc-tpl="145"
                style={{
                  fontSize: "14.5px",
                  fontWeight: "600",
                  color: "rgb(255, 240, 215)",
                }}
              >
                Atención personalizada
              </span>
            </div>
            <div
              data-dc-tpl="146"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
              }}
            >
              <span
                data-dc-tpl="147"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "rgb(255, 220, 150)",
                }}
              ></span>
              <span
                data-dc-tpl="148"
                style={{
                  fontSize: "14.5px",
                  fontWeight: "600",
                  color: "rgb(255, 240, 215)",
                }}
              >
                Garantía y refacciones
              </span>
            </div>
            <div
              data-dc-tpl="149"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
              }}
            >
              <span
                data-dc-tpl="150"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "rgb(255, 220, 150)",
                }}
              ></span>
              <span
                data-dc-tpl="151"
                style={{
                  fontSize: "14.5px",
                  fontWeight: "600",
                  color: "rgb(255, 240, 215)",
                }}
              >
                Servicio rápido y compra segura
              </span>
            </div>
          </div>
          <div
            data-dc-tpl="152"
            style={{
              height: "1px",
              background: "rgba(255, 255, 255, 0.12)",
              margin: "26px 0px",
            }}
          ></div>
          <div
            data-dc-tpl="153"
            style={{
              display: "grid",
              gap: "12px",
              fontSize: "14px",
            }}
          >
            <a
              data-dc-tpl="154"
              href={`mailto:${CONTACT.email}`}
              style={{
                color: "rgb(255, 235, 210)",
                textDecoration: "none",
              }}
            >
              {CONTACT.email}
            </a>
            <span
              data-dc-tpl="155"
              style={{
                color: "rgb(255, 235, 210)",
              }}
            >
              <strong data-dc-tpl="156" style={{ color: "rgb(255, 255, 255)" }}>
                MTY
              </strong>{" "}
              {CONTACT.phoneMonterrey}
            </span>
            <span
              data-dc-tpl="157"
              style={{
                color: "rgb(255, 235, 210)",
              }}
            >
              <strong data-dc-tpl="158" style={{ color: "rgb(255, 255, 255)" }}>
                GDL
              </strong>{" "}
              {CONTACT.phoneGuadalajara}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
