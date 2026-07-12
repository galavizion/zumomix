import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("data")
    .order("updated_at", { ascending: false });
  if (error || !data || data.length === 0)
    return PRODUCTS.filter((p) => p.status !== "draft");
  return data.map((r) => r.data as Product).filter((p) => p.status !== "draft");
}

const badgeConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  1: { label: "Más vendido", bgColor: "rgb(122, 181, 54)", textColor: "rgb(255, 255, 255)" },
  2: { label: "Nuevo", bgColor: "rgb(245, 158, 11)", textColor: "rgb(255, 255, 255)" },
  4: { label: "Más vendido", bgColor: "rgb(122, 181, 54)", textColor: "rgb(255, 255, 255)" },
  5: { label: "Disponible", bgColor: "rgb(232, 245, 216)", textColor: "rgb(122, 181, 54)" },
};

const categoryLabels: Record<string, string> = {
  exprimidores: "Exprimidor",
  dispensadoras: "Dispensador",
  maquinas: "Bebidas frías",
};

export default async function ProductGrid() {
  const products = await getProducts();
  const delays = [0, 80, 160];

  return (
    <section
      data-dc-tpl="69"
      id="productos"
      style={{
        maxWidth: "1180px",
        margin: "0px auto",
        padding: "84px 28px 30px",
      }}
    >
      <div
        data-dc-tpl="70"
        data-reveal=""
        style={{
          textAlign: "center",
          maxWidth: "620px",
          margin: "0px auto 48px",
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
          data-dc-tpl="71"
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgb(122, 181, 54)",
          }}
        >
          Catálogo
        </span>
        <h2
          data-dc-tpl="72"
          style={{
            fontSize: "40px",
            fontWeight: "800",
            color: "rgb(34, 48, 15)",
            letterSpacing: "-0.02em",
            margin: "12px 0px 14px",
          }}
        >
          Exprimidores y dispensadores
        </h2>
        <p
          data-dc-tpl="73"
          style={{
            fontSize: "17px",
            color: "rgb(107, 117, 96)",
          }}
        >
          Elige el equipo ideal para tu negocio.
        </p>
      </div>
      <div
        data-dc-tpl="74"
        className="products-grid"
      >
        {products.map((product, index) => {
          const delay = delays[index % 3];
          const badge = badgeConfig[product.id];
          const categoryLabel = categoryLabels[product.category] || "Producto";

          return (
            <article
              key={product.id}
              data-dc-tpl="76"
              data-reveal=""
              data-delay={delay}
              className="scp3"
              style={{
                animationDuration: "0.7s",
                animationTimingFunction: "ease",
                animationDelay: "0s",
                animationIterationCount: "1",
                animationDirection: "normal",
                animationFillMode: "both",
                animationPlayState: "running",
                animationName: "revfade",
                animationTimeline: "view()",
                animationRange: "entry cover 22%",
                background: "rgb(255, 255, 255)",
                border: "1px solid rgb(237, 240, 232)",
                borderRadius: "22px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transitionProperty: "opacity, transform, box-shadow, border-color",
                opacity: 1,
                transform: "translateY(0px)",
                transitionDelay: `${delay}ms`,
              }}
            >
              <div
                data-dc-tpl="77"
                style={{
                  position: "relative",
                  background: "rgb(255, 255, 255)",
                  padding: "16px",
                  height: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {badge && (
                  <span
                    data-dc-tpl="79"
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: badge.bgColor,
                      color: badge.textColor,
                      fontSize: "11.5px",
                      fontWeight: "700",
                      letterSpacing: "0.04em",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                    }}
                  >
                    {badge.label}
                  </span>
                )}
                <img
                  data-dc-tpl="80"
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                data-dc-tpl="81"
                style={{
                  padding: "22px 22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: "1 1 0%",
                  borderTop: "1px solid rgb(241, 244, 236)",
                }}
              >
                <span
                  data-dc-tpl="82"
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgb(154, 167, 138)",
                    marginBottom: "7px",
                  }}
                >
                  {categoryLabel}
                </span>
                <h3
                  data-dc-tpl="83"
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "rgb(34, 48, 15)",
                    lineHeight: "1.3",
                    marginBottom: "18px",
                    flex: "1 1 0%",
                  }}
                >
                  {product.name}
                </h3>
                <Link
                  data-dc-tpl="84"
                  href={`/productos/${product.slug}`}
                  className="scp4"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    background: "rgb(254, 240, 230)",
                    color: "rgb(196, 98, 15)",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "14.5px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  Conoce más
                  <span data-dc-tpl="85">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
