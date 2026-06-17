import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PromoBar from "@/components/layout/PromoBar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/components/cart/CartProvider";
import { CustomerProvider } from "@/components/customer/CustomerProvider";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: {
      default: s.site_title || "Zumomix - Exprimidores y dispensadores para tu negocio",
      template: "%s | Zumomix",
    },
    description: s.site_description || "Equipos profesionales de extracción de jugos naturales.",
    ...(s.favicon_url ? { icons: { icon: s.favicon_url, shortcut: s.favicon_url } } : {}),
    ...(s.google_search_console
      ? { verification: { google: s.google_search_console } }
      : {}),
    openGraph: {
      siteName: "Zumomix",
      locale: "es_MX",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/* Google Analytics GA4 */}
        {settings.google_analytics_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.google_analytics_id}');
            `}</Script>
          </>
        )}

        {/* Google Ads */}
        {settings.google_ads_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_ads_id}`}
              strategy="afterInteractive"
            />
            <Script id="gads-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.google_ads_id}');
            `}</Script>
          </>
        )}

        {/* Meta (Facebook) Pixel */}
        {settings.meta_pixel_id && (
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
            n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${settings.meta_pixel_id}');fbq('track','PageView');
          `}</Script>
        )}

        {/* TikTok Pixel */}
        {settings.tiktok_pixel_id && (
          <Script id="tiktok-pixel" strategy="afterInteractive">{`
            !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
            ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
            var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
            var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${settings.tiktok_pixel_id}');ttq.page();}(window,document,'ttq');
          `}</Script>
        )}

        {/* Scripts personalizados */}
        {settings.custom_head_scripts && (
          <Script id="custom-scripts" strategy="afterInteractive">{settings.custom_head_scripts}</Script>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <CustomerProvider>
          <CartProvider>
            <Navbar logoUrl={settings.logo_url} logoText={settings.logo_text} />
            <PromoBar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
