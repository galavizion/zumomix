export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
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

const DEFAULT_VISIBILITY = {
  products: true,
  testimonials: true,
  action: true,
  concentrados: true,
  clientLogos: true,
  gallery: true,
  contact: true,
};

async function getSectionVisibility() {
  const { data } = await supabase
    .from("home_sections")
    .select("content")
    .eq("section", "visibility")
    .single();
  if (!data?.content) return DEFAULT_VISIBILITY;
  return { ...DEFAULT_VISIBILITY, ...(data.content as typeof DEFAULT_VISIBILITY) };
}

export default async function HomePage() {
  const vis = await getSectionVisibility();

  return (
    <>
      <Hero />
      {vis.products && <ProductGrid />}
      {vis.testimonials && <Testimonials />}
      {vis.action && <ActionSection />}
      {vis.concentrados && <ConcentradosBanner />}
      {vis.clientLogos && <ClientLogos />}
      {vis.gallery && <GallerySection />}
      {vis.contact && <ContactSection />}
    </>
  );
}
