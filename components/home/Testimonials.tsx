"use client";

import { useEffect, useState } from "react";
import { useHomeData } from "@/hooks/useHomeData";

type Review = {
  id: string;
  author: string;
  initial: string;
  timeAgo: string;
  rating: number;
  comment: string;
  avatarBg?: string;
};

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Berenice Gonzalez",
    initial: "B",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Excelente servicio, no es fraude, son muy confiables, entregan súper rápido. Llevo 5 máquinas y todas son excelentes, muy recomendados.",
    avatarBg: "rgb(122, 181, 54)",
  },
  {
    id: "2",
    author: "Angel Leon",
    initial: "A",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Excelente atención, llegan súper rápido. No he tenido detalle en ninguna de las máquinas, son muy seguros.",
    avatarBg: "rgb(122, 181, 54)",
  },
  {
    id: "3",
    author: "Miguel Reyes",
    initial: "M",
    timeAgo: "hace 1 año",
    rating: 5,
    comment: "Platiqué directo con Oscar para comprar una máquina y el tiempo de respuesta fue excelente. En una semana ya la tenía. Amables y serviciales.",
    avatarBg: "rgb(34, 48, 15)",
  },
];

export default function Testimonials() {
  const { data } = useHomeData();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const testimonialsData = data.testimonials?.content || {
    title: "Lo que dicen nuestros clientes",
    subtitle: "Reseñas de Google",
  };

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(console.error);
  }, []);

  if (reviews.length === 0) {
    return null;
  }

  const delays = [0, 90, 180];

  return (
    <section
      data-dc-tpl="86"
      id="resenas"
      style={{
        background: "rgb(251, 252, 249)",
        borderTop: "1px solid rgb(240, 242, 235)",
        borderBottom: "1px solid rgb(240, 242, 235)",
        marginTop: "70px",
      }}
    >
      <div
        data-dc-tpl="87"
        style={{
          maxWidth: "1180px",
          margin: "0px auto",
          padding: "80px 28px",
        }}
      >
        <div
          data-dc-tpl="88"
          data-reveal=""
          style={{
            textAlign: "center",
            marginBottom: "46px",
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
            data-dc-tpl="89"
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgb(122, 181, 54)",
            }}
          >
            {testimonialsData.subtitle}
          </span>
          <h2
            data-dc-tpl="90"
            style={{
              fontSize: "40px",
              fontWeight: "800",
              color: "rgb(34, 48, 15)",
              letterSpacing: "-0.02em",
              margin: "12px 0px 0px",
            }}
          >
            {testimonialsData.title}
          </h2>
        </div>
        <div
          data-dc-tpl="91"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {reviews.slice(0, 3).map((review, index) => {
            const delay = delays[index % 3];
            return (
              <div
                key={review.id}
                data-dc-tpl="93"
                data-reveal=""
                data-delay={delay}
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
                  background: "rgb(255, 255, 255)",
                  border: "1px solid rgb(237, 240, 232)",
                  borderRadius: "20px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  opacity: 1,
                  transform: "translateY(0px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                <div
                  data-dc-tpl="94"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    data-dc-tpl="95"
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      background: review.avatarBg || "rgb(122, 181, 54)",
                      color: "rgb(255, 255, 255)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    {review.initial}
                  </span>
                  <div data-dc-tpl="96">
                    <div
                      data-dc-tpl="97"
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "rgb(34, 48, 15)",
                      }}
                    >
                      {review.author}
                    </div>
                    <div
                      data-dc-tpl="98"
                      style={{
                        fontSize: "12.5px",
                        color: "rgb(154, 167, 138)",
                      }}
                    >
                      {review.timeAgo}
                    </div>
                  </div>
                  <span
                    data-dc-tpl="99"
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "rgb(154, 167, 138)",
                    }}
                  >
                    G
                  </span>
                </div>
                <div
                  data-dc-tpl="100"
                  style={{
                    color: "rgb(245, 166, 35)",
                    fontSize: "16px",
                    letterSpacing: "2px",
                    marginBottom: "12px",
                  }}
                >
                  {"★".repeat(review.rating)}
                </div>
                <p
                  data-dc-tpl="101"
                  style={{
                    fontSize: "14.5px",
                    lineHeight: "1.62",
                    color: "rgb(91, 102, 80)",
                  }}
                >
                  {review.comment}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}