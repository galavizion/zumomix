export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import ContactSection from "@/components/home/ContactSection";
import Testimonials from "@/components/home/Testimonials";
import ActionSection from "@/components/home/ActionSection";
import ConcentradosBanner from "@/components/home/ConcentradosBanner";
import ClientLogos from "@/components/home/ClientLogos";
import GallerySection from "@/components/home/GallerySection";

export const metadata: Metadata = {
  title: "Zumomix - Exprimidores y dispensadores para tu negocio",
  description:
    "Equipos profesionales de extracción de jugos naturales. Venta, renta y soporte técnico en toda la República Mexicana.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      
      <Testimonials />
      <ActionSection />
      <ConcentradosBanner />
      <ClientLogos />
      <GallerySection />
      <ContactSection />
    </>
  );
}
