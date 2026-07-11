import Image from "next/image";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const DEFAULT_IMAGE = "/img/products-2.jpeg";

export default function TranquilidadSection({ title, description, image }: Props) {
  const src = image || DEFAULT_IMAGE;
  const heading = title || "Tranquilidad en tu compra";
  const body = description || "Soporte técnico y de refacciones exclusivo para nuestros clientes.";

  return (
    <section style={{ background: "rgb(130, 70, 5)", padding: "0" }}>
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "420px",
        }}
        className="tranquilidad-grid"
      >
        {/* Texto */}
        <div style={{
          padding: "72px 60px 72px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}>
          <span style={{
            fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgb(255, 220, 150)",
          }}>
            Nuestro compromiso
          </span>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: "800",
            color: "white", lineHeight: 1.1, letterSpacing: "-0.02em",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: "17px", color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7, maxWidth: "420px",
          }}>
            {body}
          </p>
          <div style={{ display: "flex", gap: "32px", marginTop: "8px" }}>
            {[
              { icon: "🔧", label: "Soporte técnico" },
              { icon: "⚙️", label: "Refacciones originales" },
              { icon: "📞", label: "Atención personalizada" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "26px" }}>{icon}</span>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.6)", textAlign: "center" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Foto */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src={src}
            alt="Soporte y refacciones Zumomix"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="(max-width: 768px) 100vw, 590px"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgb(130,70,5) 0%, transparent 30%)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tranquilidad-grid {
            grid-template-columns: 1fr !important;
          }
          .tranquilidad-grid > div:last-child {
            height: 260px;
            position: relative;
          }
        }
      `}</style>
    </section>
  );
}
