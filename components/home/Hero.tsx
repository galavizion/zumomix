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
      {/* ── Carousel (primero en DOM → arriba en mobile) ── */}
      <div
        data-dc-tpl="49"
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
          style={{
            position: "absolute",
            inset: "8% 6%",
            background: "radial-gradient(circle at 50% 40%, rgb(232, 245, 216), rgb(243, 249, 234) 70%)",
            borderRadius: "50%",
            filter: "blur(2px)",
            animation: "blobpulse 4s ease-in-out infinite",
          }}
        />
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",top:"-6%",right:"4%",width:"120px",height:"120px",animation:"36s linear 0s infinite normal none running blobspin"}}>
          <circle cx="64" cy="60" r="1.8" fill="#E8175D"/><circle cx="65.78383153676879" cy="62.53702373465033" r="2.1157894736842104" fill="#C1272D"/><circle cx="65.84600935508534" cy="66.35045901844177" r="2.431578947368421" fill="#F7941D"/><circle cx="63.554604715503906" cy="70.35420980388064" r="2.7473684210526317" fill="#FFD200"/><circle cx="58.90473710215643" cy="73.21785748619372" r="3.0631578947368423" fill="#8DC63F"/><circle cx="52.58524061373822" cy="73.70127528195373" r="3.378947368421053" fill="#E8175D"/><circle cx="45.878538252906644" cy="70.99117485865722" r="3.694736842105263" fill="#C1272D"/><circle cx="40.40791041469985" cy="64.96139089800353" r="4.010526315789473" fill="#F7941D"/><circle cx="37.780913797033406" cy="56.292290282097156" r="4.326315789473684" fill="#FFD200"/><circle cx="39.203022224215076" cy="46.41265628243235" r="4.6421052631578945" fill="#8DC63F"/><circle cx="45.146039495201464" cy="37.264320906133435" r="4.957894736842105" fill="#E8175D"/><circle cx="55.148791023304696" cy="30.928298426025023" r="5.273684210526316" fill="#C1272D"/><circle cx="67.80385443331802" cy="29.18327575645497" r="5.589473684210526" fill="#F7941D"/><circle cx="80.9478862012055" cy="33.086155258480886" r="5.905263157894737" fill="#FFD200"/><circle cx="92.0313597807837" cy="42.66549494833393" r="6.221052631578947" fill="#8DC63F"/><circle cx="98.60453615015311" cy="56.801136933282265" r="6.536842105263157" fill="#E8175D"/><circle cx="98.82828676455237" cy="73.32976768313964" r="6.852631578947368" fill="#C1272D"/><circle cx="91.90718433656107" cy="89.3726323694532" r="7.168421052631579" fill="#F7941D"/><circle cx="78.3511383473041" cy="101.83638144929418" r="7.484210526315789" fill="#FFD200"/><circle cx="60.000000000000014" cy="108" r="7.8" fill="#8DC63F"/>
          <circle cx="58" cy="63.46410161513776" r="1.8" fill="#F7941D"/><circle cx="54.91095722740435" cy="63.74043317472619" r="2.1157894736842104" fill="#FFD200"/><circle cx="51.57733648679476" cy="61.887563103044506" r="2.431578947368421" fill="#8DC63F"/><circle cx="49.25568891597353" cy="57.90127308209802" r="2.7473684210526317" fill="#E8175D"/><circle cx="49.10063108227569" cy="52.442545763548054" r="3.0631578947368423" fill="#C1272D"/><circle cx="51.841727234715165" cy="46.72799236757133" r="3.378947368421053" fill="#F7941D"/><circle cx="57.54209422851268" cy="42.27486795911837" r="3.694736842105263" fill="#FFD200"/><circle cx="65.49935423687413" cy="40.55205725690778" r="4.010526315789473" fill="#8DC63F"/><circle cx="74.3205139070456" cy="42.611561758306024" r="4.326315789473684" fill="#E8175D"/><circle cx="82.16547371725694" cy="48.78296078301369" r="4.6421052631578945" fill="#C1272D"/><circle cx="87.11665591997848" cy="58.50393240296703" r="4.957894736842105" fill="#F7941D"/><circle cx="87.60243658265003" cy="70.33458057410225" r="5.273684210526316" fill="#FFD200"/><circle cx="82.78613883967078" cy="82.16669830846172" r="5.589473684210526" fill="#8DC63F"/><circle cx="72.83413015906305" cy="91.59832397658901" r="5.905263157894737" fill="#E8175D"/><circle cx="58.99644184638065" cy="96.40722381375086" r="6.221052631578947" fill="#C1272D"/><circle cx="43.46802860392879" cy="95.03194054070616" r="6.536842105263157" fill="#F7941D"/><circle cx="29.041939177580048" cy="86.96139888195962" r="6.852631578947368" fill="#FFD200"/><circle cx="18.60896202375188" cy="72.94611601396822" r="7.168421052631579" fill="#8DC63F"/><circle cx="14.59306168884315" cy="54.97436127248106" r="7.484210526315789" fill="#E8175D"/><circle cx="18.430780618346922" cy="36.00000000000004" r="7.8" fill="#C1272D"/>
          <circle cx="58" cy="56.53589838486225" r="1.8" fill="#8DC63F"/><circle cx="59.30521123582687" cy="53.722543090623475" r="2.1157894736842104" fill="#E8175D"/><circle cx="62.57665415811988" cy="51.76197787851372" r="2.431578947368421" fill="#C1272D"/><circle cx="67.18970636852256" cy="51.74451711402134" r="2.7473684210526317" fill="#F7941D"/><circle cx="71.99463181556787" cy="54.339596750258224" r="3.0631578947368423" fill="#FFD200"/><circle cx="75.57303215154661" cy="59.57073235047495" r="3.378947368421053" fill="#8DC63F"/><circle cx="76.57936751858067" cy="66.73395718222442" r="3.694736842105263" fill="#E8175D"/><circle cx="74.09273534842603" cy="74.48655184508868" r="4.010526315789473" fill="#C1272D"/><circle cx="67.89857229592101" cy="81.0961479595968" r="4.326315789473684" fill="#F7941D"/><circle cx="58.631504058527995" cy="84.80438293455396" r="4.6421052631578945" fill="#FFD200"/><circle cx="47.737304584820066" cy="84.23174669089954" r="4.957894736842105" fill="#8DC63F"/><circle cx="37.24877239404528" cy="78.73712099987274" r="5.273684210526316" fill="#E8175D"/><circle cx="29.410006727011215" cy="68.65002593508333" r="5.589473684210526" fill="#C1272D"/><circle cx="26.217983639731457" cy="55.31552076493013" r="5.905263157894737" fill="#F7941D"/><circle cx="28.972198372835646" cy="40.927281237915224" r="6.221052631578947" fill="#FFD200"/><circle cx="37.927435245918076" cy="28.16692252601158" r="6.536842105263157" fill="#8DC63F"/><circle cx="52.12977405786755" cy="19.70883343490074" r="6.852631578947368" fill="#E8175D"/><circle cx="69.48385363968701" cy="17.68125161657857" r="7.168421052631579" fill="#C1272D"/><circle cx="87.05579996385276" cy="23.189257278224787" r="7.484210526315789" fill="#F7941D"/><circle cx="101.56921938165306" cy="36.00000000000001" r="7.8" fill="#FFD200"/>
        </svg>
        <HeroCarousel items={carouselItems} />
      </div>

      {/* ── Texto (segundo en DOM → abajo en mobile) ── */}
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
