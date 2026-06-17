"use client";

import Image from "next/image";
import Link from "next/link";
import { useHomeData } from "@/hooks/useHomeData";

const HIGHLIGHTS = [
  "Presentación de litro",
  "Cajas de 24 litros con sabores mixtos",
  "Envío a toda la república",
  "Calidad premium y sabores exóticos",
];

export default function ConcentradosBanner() {
  const { data } = useHomeData();

  const concentradosData = data.concentrados?.content || {
    title: "Concentrados naturales para aguas frescas",
    description: "Más de 30 sabores: fresa-kiwi, pepino-limón, mango, maracuyá y más. Elaborados con fruta natural, sin conservadores artificiales.",
  };
  return (
    <section
      style={{
        background: "rgb(239, 239, 239)",
        padding: "84px 28px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0px auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <div
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
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "rgb(122, 181, 54)",
                display: "inline-block",
              }}
            ></span>
            Concentrados naturales
          </span>
          <h2
            style={{
              fontSize: "38px",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.02em",
              margin: "12px 0px 16px",
              lineHeight: "1.1",
            }}
          >
            {concentradosData.title}
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "rgb(91, 102, 80)",
              marginBottom: "24px",
            }}
          >
            {concentradosData.description}
          </p>
          <ul
            style={{
              display: "grid",
              gap: "12px",
              marginBottom: "30px",
            }}
          >
            {HIGHLIGHTS.map((h) => (
              <li
                key={h}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14.5px",
                  fontWeight: "600",
                  color: "rgb(72, 84, 60)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgb(122, 181, 54)",
                    flexShrink: 0,
                  }}
                ></span>
                {h}
              </li>
            ))}
          </ul>
          <Link
            href="/concentrados"
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
            Conoce los concentrados
            <span style={{ fontSize: "18px" }}>→</span>
          </Link>
        </div>
        <div
          data-reveal=""
          data-delay="100"
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            aspectRatio: "4 / 5",
            boxShadow: "rgba(40, 60, 20, 0.12) 0px 16px 30px",
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
            transitionDelay: "100ms",
          }}
        >
          <Image
            src="https://www.zumomix.com/wp-content/uploads/2023/01/jugos-zumomix-967x1024.jpg"
            alt="Concentrados naturales Zumomix"
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
