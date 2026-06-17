"use client";

import Link from "next/link";
import { useHomeData } from "@/hooks/useHomeData";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  const { data } = useHomeData();

  const heroData = data.hero?.content || {
    title: "Exprimidores y dispensadores",
    subtitle: "a precio accesible",
    description: "Equipos robustos para naranjas, limones, frappés y aguas frescas. Atención personalizada, garantía y envíos a todo México.",
  };

  const carouselItems = heroData.carousel ?? undefined;

  return (
    <>
    <section
      data-dc-tpl="26"
      id="inicio"
      className="hero-section"
    >
      <div
        data-dc-tpl="27"
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
          transitionDelay: "0ms",
          opacity: 1,
          transform: "translateY(0px)",
        }}
      >
        <span
          data-dc-tpl="28"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgb(255, 255, 255)",
            border: "1px solid rgb(216, 232, 194)",
            color: "rgb(122, 181, 54)",
            fontSize: "13px",
            fontWeight: "600",
            padding: "7px 14px",
            borderRadius: "999px",
            marginBottom: "22px",
          }}
        >
          <span
            data-dc-tpl="29"
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "rgb(122, 181, 54)",
              display: "inline-block",
            }}
          ></span>
          Equipos profesionales para tu negocio
        </span>
        <h1
          data-dc-tpl="30"
          className="hero-title"
          style={{
            fontSize: "54px",
            lineHeight: "1.04",
            fontWeight: "800",
            color: "rgb(34, 48, 15)",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            textWrap: "balance",
          }}
        >
          {heroData.title}{" "}
          <span data-dc-tpl="31" style={{ color: "rgb(122, 181, 54)" }}>
            {heroData.subtitle}
          </span>
        </h1>
        <p
          data-dc-tpl="32"
          className="hero-desc"
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "rgb(91, 102, 80)",
            maxWidth: "480px",
            marginBottom: "32px",
          }}
        >
          {heroData.description}
        </p>
        <div
          data-dc-tpl="33"
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link
            href="#productos"
            data-dc-tpl="34"
            className="scp1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              background: "rgb(122, 181, 54)",
              color: "rgb(255, 255, 255)",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "16px",
              padding: "15px 28px",
              borderRadius: "14px",
              boxShadow: "rgba(122, 181, 54, 0.32) 0px 12px 28px",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Ir a la Tienda
            <span data-dc-tpl="35" style={{ fontSize: "18px" }}>
              →
            </span>
          </Link>
          <Link
            href="#productos"
            data-dc-tpl="36"
            className="scp2"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgb(255, 255, 255)",
              color: "rgb(63, 74, 54)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "16px",
              padding: "15px 24px",
              borderRadius: "14px",
              border: "1.5px solid rgb(227, 232, 220)",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            Ver productos
          </Link>
        </div>
        <div
          data-dc-tpl="37"
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "42px",
            flexWrap: "wrap",
          }}
        >
          <div data-dc-tpl="38">
            <div
              data-dc-tpl="39"
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: "rgb(34, 48, 15)",
              }}
            >
              +500
            </div>
            <div
              data-dc-tpl="40"
              style={{
                fontSize: "13.5px",
                color: "rgb(124, 135, 114)",
              }}
            >
              clientes en México
            </div>
          </div>
          <div
            data-dc-tpl="41"
            style={{
              width: "1px",
              background: "rgb(232, 236, 225)",
            }}
          ></div>
          <div data-dc-tpl="42">
            <div
              data-dc-tpl="43"
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: "rgb(34, 48, 15)",
              }}
            >
              4.9★
            </div>
            <div
              data-dc-tpl="44"
              style={{
                fontSize: "13.5px",
                color: "rgb(124, 135, 114)",
              }}
            >
              en reseñas Google
            </div>
          </div>
          <div
            data-dc-tpl="45"
            style={{
              width: "1px",
              background: "rgb(232, 236, 225)",
            }}
          ></div>
          <div data-dc-tpl="46">
            <div
              data-dc-tpl="47"
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: "rgb(34, 48, 15)",
              }}
            >
              24/7
            </div>
            <div
              data-dc-tpl="48"
              style={{
                fontSize: "13.5px",
                color: "rgb(124, 135, 114)",
              }}
            >
              soporte y refacciones
            </div>
          </div>
        </div>
      </div>
      <div
        data-dc-tpl="49"
        data-reveal=""
        data-delay="120"
        className="hero-image-col"
        style={{
          position: "relative",
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
          transitionDelay: "120ms",
          opacity: 1,
          transform: "translateY(0px)",
        }}
      >
        <div
          data-dc-tpl="50"
          style={{
            position: "absolute",
            inset: "8% 6%",
            background:
              "radial-gradient(circle at 50% 40%, rgb(232, 245, 216), rgb(243, 249, 234) 70%)",
            borderRadius: "50%",
            filter: "blur(2px)",
            animation: "blobpulse 4s ease-in-out infinite",
          }}
        ></div>
        <div
          data-dc-tpl="51"
          style={{
            position: "absolute",
            top: "-6%",
            right: "4%",
            width: "120px",
            height: "120px",
            border: "2px dashed rgb(207, 227, 176)",
            borderRadius: "50%",
            animation: "36s linear 0s infinite normal none running blobspin",
          }}
        ></div>
        <HeroCarousel items={carouselItems} />
      </div>
    </section>
    <div
      data-dc-tpl="59"
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
        borderTop: "1px solid rgb(240, 242, 235)",
        borderBottom: "1px solid rgb(240, 242, 235)",
        background: "rgb(251, 252, 249)",
        opacity: 1,
        transform: "translateY(0px)",
        transitionDelay: "0ms",
      }}
    >
      <div
        data-dc-tpl="60"
        style={{
          maxWidth: "1180px",
          margin: "0px auto",
          padding: "20px 28px",
          display: "flex",
          justifyContent: "space-between",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        <div
          data-dc-tpl="61"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            fontSize: "14.5px",
            fontWeight: "600",
            color: "rgb(72, 84, 60)",
          }}
        >
          <span
            data-dc-tpl="62"
            style={{
              color: "rgb(122, 181, 54)",
              fontSize: "18px",
            }}
          >
            ●
          </span>
          Atención personalizada
        </div>
        <div
          data-dc-tpl="63"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            fontSize: "14.5px",
            fontWeight: "600",
            color: "rgb(72, 84, 60)",
          }}
        >
          <span
            data-dc-tpl="64"
            style={{
              color: "rgb(122, 181, 54)",
              fontSize: "18px",
            }}
          >
            ●
          </span>
          Garantía y refacciones
        </div>
        <div
          data-dc-tpl="65"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            fontSize: "14.5px",
            fontWeight: "600",
            color: "rgb(72, 84, 60)",
          }}
        >
          <span
            data-dc-tpl="66"
            style={{
              color: "rgb(122, 181, 54)",
              fontSize: "18px",
            }}
          >
            ●
          </span>
          Servicio rápido y compra segura
        </div>
        <div
          data-dc-tpl="67"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            fontSize: "14.5px",
            fontWeight: "600",
            color: "rgb(72, 84, 60)",
          }}
        >
          <span
            data-dc-tpl="68"
            style={{
              color: "rgb(122, 181, 54)",
              fontSize: "18px",
            }}
          >
            ●
          </span>
          Envíos a todo México
        </div>
      </div>
    </div>
    </>
  );
}
