"use client";

import { PRODUCTS } from "@/lib/constants";
import { useHomeData } from "@/hooks/useHomeData";

export default function ActionSection() {
  const { data } = useHomeData();
  const product = PRODUCTS.find((p) => p.slug === "exprimidor-atomic") || PRODUCTS[0];

  const actionData = data.action?.content || {
    title: "Exprime jugo de limón sin esfuerzo",
    description: "Mira cómo nuestros equipos trabajan en piloto automático: rápidos, robustos y fáciles de operar todos los días.",
  };

  return (
    <section
      data-dc-tpl="102"
      style={{
        maxWidth: "1180px",
        margin: "0px auto",
        padding: "84px 28px",
      }}
    >
      <div
        data-dc-tpl="103"
        data-reveal=""
        style={{
          display: "grid",
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: "44px",
          alignItems: "center",
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
        <div data-dc-tpl="104">
          <span
            data-dc-tpl="105"
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgb(122, 181, 54)",
            }}
          >
            En acción
          </span>
          <h2
            data-dc-tpl="106"
            style={{
              fontSize: "38px",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.02em",
              margin: "12px 0px 16px",
              lineHeight: "1.1",
            }}
          >
            {actionData.title}
          </h2>
          <p
            data-dc-tpl="107"
            style={{
              fontSize: "16.5px",
              lineHeight: "1.6",
              color: "rgb(91, 102, 80)",
              marginBottom: "24px",
            }}
          >
            {actionData.description}
          </p>
          <a
            data-dc-tpl="108"
            href="#contacto"
            className="scp5"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              background: "rgb(34, 48, 15)",
              color: "rgb(255, 255, 255)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "15px",
              padding: "13px 24px",
              borderRadius: "13px",
              transition: "background 0.2s",
            }}
          >
            Solicitar demostración →
          </a>
        </div>
        <div
          data-dc-tpl="109"
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            aspectRatio: "16 / 10",
            background: "linear-gradient(135deg, rgb(43, 58, 24), rgb(31, 42, 20))",
            boxShadow: "rgba(40, 60, 20, 0.22) 0px 28px 56px",
          }}
        >
          <img
            data-dc-tpl="110"
            src={product.images[0]}
            alt={product.name}
            style={{
              position: "absolute",
              right: "-4%",
              bottom: "-6%",
              height: "115%",
              width: "auto",
              objectFit: "contain",
              opacity: 0.92,
            }}
          />
          <div
            data-dc-tpl="111"
            style={{
              position: "absolute",
              inset: "0px",
              background: "linear-gradient(90deg, rgba(20, 28, 10, 0.7) 30%, rgba(20, 28, 10, 0.1))",
            }}
          ></div>
          <button
            data-dc-tpl="112"
            className="scp6"
            style={{
              position: "absolute",
              top: "50%",
              left: "14%",
              transform: "translateY(-50%)",
              width: "78px",
              height: "78px",
              border: "none",
              borderRadius: "50%",
              background: "rgb(122, 181, 54)",
              color: "rgb(255, 255, 255)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 12px 28px",
              transition: "transform 0.2s",
            }}
          >
            <span
              data-dc-tpl="113"
              style={{
                position: "absolute",
                inset: "0px",
                borderRadius: "50%",
                background: "rgb(122, 181, 54)",
                animation: "2.4s ease-out 0s infinite normal none running pulsering",
              }}
            ></span>
            <span
              data-dc-tpl="114"
              style={{
                position: "relative",
                borderLeft: "20px solid rgb(255, 255, 255)",
                borderTop: "13px solid transparent",
                borderBottom: "13px solid transparent",
                marginLeft: "5px",
              }}
            ></span>
          </button>
          <div
            data-dc-tpl="115"
            style={{
              position: "absolute",
              left: "14%",
              bottom: "9%",
              color: "rgb(255, 255, 255)",
              fontWeight: "700",
              fontSize: "17px",
              maxWidth: "60%",
              lineHeight: "1.25",
            }}
          >
            {product.name}
          </div>
        </div>
      </div>
    </section>
  );
}
