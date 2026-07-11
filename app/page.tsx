export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { getSiteSettings } from "@/lib/site-settings";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import ContactSection from "@/components/home/ContactSection";
import Testimonials from "@/components/home/Testimonials";
import ActionSection, { ActionSectionB1 } from "@/components/home/ActionSection";
import TranquilidadSection from "@/components/home/TranquilidadSection";
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
  tranquilidad: true,
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

async function getTranquilidadData() {
  const { data } = await supabase
    .from("home_sections")
    .select("content")
    .eq("section", "tranquilidad")
    .single();
  return (data?.content ?? {}) as { title?: string; description?: string; image?: string };
}

export default async function HomePage() {
  const [vis, tranquilidad, settings] = await Promise.all([
    getSectionVisibility(),
    getTranquilidadData(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero />
      {vis.products && <ProductGrid />}
      {vis.testimonials && <Testimonials />}
      {vis.action && <ActionSection />}
      {vis.concentrados && <ConcentradosBanner />}
      {vis.clientLogos && <ClientLogos />}
      <ActionSectionB1 />
      {vis.tranquilidad && <TranquilidadSection {...tranquilidad} />}
      {vis.gallery && <GallerySection />}
      {vis.contact && <ContactSection logoUrl={settings.logo_url} />}
    </>
  );
}
