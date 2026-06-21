"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🔘",
    title: "Botones independientes",
    desc: "Interruptores separados del sistema de enfriamiento y giratorio.",
  },
  {
    icon: "🔄",
    title: "Sistema giratorio",
    desc: "Evita sedimentos en el fondo del tanque, manteniendo tus aguas frescas en movimiento.",
  },
  {
    icon: "🧊",
    title: "Charola MIX",
    desc: "Charola individual por tanque para evitar escurrimientos. Fácil de retirar para limpieza.",
  },
  {
    icon: "💨",
    title: "Ventilación eficiente",
    desc: "Salidas de aire para disipar el calor. Operación muy silenciosa.",
  },
  {
    icon: "🛢️",
    title: "Tanques de 18 lts",
    desc: "Capacidad de 18 lts por tanque con anillos de goma selladores que evitan fugas.",
  },
  {
    icon: "🔧",
    title: "Refacciones y taller",
    desc: "Contamos con refacciones y taller especializado. Siempre tendrás el soporte de Zumomix.",
  },
];

const SPECS: Record<string, { label: string; mix2: string; mix3: string }[]> = {
  rows: [
    { label: "Material",         mix2: "Acero inoxidable y plástico", mix3: "Acero inoxidable y plástico" },
    { label: "Capacidad",        mix2: "2 tanques de 18 lts",         mix3: "3 tanques de 18 lts" },
    { label: "Fondo",            mix2: "43 cm",                       mix3: "43 cm" },
    { label: "Frente",           mix2: "48 cm",                       mix3: "74 cm" },
    { label: "Altura",           mix2: "76 cm",                       mix3: "76 cm" },
    { label: "Peso",             mix2: "36 kg",                       mix3: "37 kg" },
    { label: "Voltaje",          mix2: "110 V",                       mix3: "110 V" },
    { label: "Energía",          mix2: "300 W",                       mix3: "385 W" },
    { label: "Limpieza",         mix2: "Diariamente después de uso",  mix3: "Diariamente después de uso" },
  ],
};

export default function DispensadoraExtra() {
  const [tab, setTab] = useState<"mix2" | "mix3">("mix2");

  return (
    <div style={{ marginTop: "72px", display: "flex", flexDirection: "column", gap: "72px" }}>

      {/* ===== Promo concentrados ===== */}
      <section style={{ background: "rgb(247, 252, 239)", borderRadius: "24px", padding: "48px 40px", display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(122, 181, 54)", display: "block", marginBottom: "10px" }}>
            Complementa tu dispensadora
          </span>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "800", color: "rgb(34, 48, 15)", marginBottom: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2 }}>
            Concentrados naturales para aguas frescas
          </h2>
          <p style={{ fontSize: "15px", color: "rgb(91, 102, 80)", lineHeight: 1.65, marginBottom: "8px" }}>
            Más de 30 sabores diferentes para ti. Fresa-Kiwi, pepino-limón, mango, maracuyá y muchos más.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 28px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Presentación de litro.",
              "Cajas de 24 litros — sabores mezclables.",
              "Envíos a toda la república.",
              "Calidad premium y sabores exóticos.",
            ].map((t) => (
              <li key={t} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "rgb(63, 74, 54)" }}>
                <span style={{ color: "rgb(122, 181, 54)", fontWeight: "700", flexShrink: 0 }}>✓</span>
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/concentrados"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgb(34, 48, 15)",
              color: "white",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "14px",
              padding: "12px 24px",
              borderRadius: "12px",
            }}
          >
            Conoce más de los concentrados →
          </Link>
        </div>
        <Image
          src="/img/concentrados/concentrados.webp"
          alt="Concentrados naturales Zumomix"
          width={200}
          height={200}
          style={{ width: "180px", height: "auto", borderRadius: "16px", flexShrink: 0 }}
        />
      </section>

      {/* ===== Features grid ===== */}
      <section>
        <h2 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: "800", color: "rgb(34, 48, 15)", marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Características
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: "white",
                border: "1.5px solid rgb(216, 232, 194)",
                borderRadius: "18px",
                padding: "24px 20px",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "rgb(34, 48, 15)", marginBottom: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "13.5px", color: "rgb(91, 102, 80)", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Ficha técnica ===== */}
      <section>
        <h2 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: "800", color: "rgb(34, 48, 15)", marginBottom: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Ficha técnica
        </h2>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {(["mix2", "mix3"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                border: "1.5px solid",
                borderColor: tab === t ? "rgb(122, 181, 54)" : "rgb(216, 232, 194)",
                background: tab === t ? "rgb(122, 181, 54)" : "white",
                color: tab === t ? "white" : "rgb(63, 74, 54)",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t === "mix2" ? "MIX2 — 2 tanques" : "MIX3 — 3 tanques"}
            </button>
          ))}
        </div>

        {/* Tabla */}
        <div style={{ border: "1.5px solid rgb(216, 232, 194)", borderRadius: "16px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {SPECS.rows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? "white" : "rgb(247, 252, 239)" }}>
                  <td style={{ padding: "14px 20px", fontSize: "14px", fontWeight: "700", color: "rgb(63, 74, 54)", width: "40%" }}>
                    {row.label}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "14px", color: "rgb(91, 102, 80)" }}>
                    {tab === "mix2" ? row.mix2 : row.mix3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
