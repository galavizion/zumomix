import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PromoBar from "@/components/layout/PromoBar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/components/cart/CartProvider";
import { CustomerProvider } from "@/components/customer/CustomerProvider";

export const metadata: Metadata = {
  title: {
    default: "Zumomix - Exprimidores y dispensadores para tu negocio",
    template: "%s | Zumomix",
  },
  description:
    "Equipos profesionales de extracción de jugos naturales. Venta, renta y soporte técnico en toda la República Mexicana. Monterrey y Guadalajara.",
  openGraph: {
    siteName: "Zumomix",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <CustomerProvider>
          <CartProvider>
            <Navbar />
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
