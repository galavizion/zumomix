import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants";

const BASE_URL = "https://www.zumomix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/productos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/concentrados`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.filter(
    (p) => p.status === "active"
  ).map((p) => ({
    url: `${BASE_URL}/productos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticPages, ...productPages];
}
