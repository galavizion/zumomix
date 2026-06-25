export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ProductDetail from "@/components/products/ProductDetail";
import ProductCard from "@/components/products/ProductCard";
import ProductExtras from "@/components/products/ProductExtras";
import productExtras from "@/lib/productExtras";
import type { ProductExtra } from "@/lib/productExtras";
import { PRODUCTS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

async function getExtras(slug: string): Promise<ProductExtra | null> {
  const { data } = await supabase
    .from("product_extras")
    .select("data")
    .eq("slug", slug)
    .single();
  const fromDb = data?.data as ProductExtra | null;
  // Si el registro existe pero está vacío, usa el fallback hardcodeado
  if (fromDb && Object.keys(fromDb).length > 0) return fromDb;
  return productExtras[slug] ?? null;
}

async function getProduct(slug: string) {
  const { data } = await supabase
    .from("products")
    .select("data")
    .eq("slug", slug)
    .single();
  if (data?.data) return data.data as (typeof PRODUCTS)[number];
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

const BASE_URL = "https://www.zumomix.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `${BASE_URL}/productos/${product.slug}`,
      images: product.images[0]
        ? [{ url: product.images[0], alt: product.name }]
        : [],
      type: "website",
    },
  };
}

function ProductJsonLd({ product }: { product: (typeof PRODUCTS)[number] }) {
  const availability = product.stock > 0
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  const offers = product.variants && product.variants.length > 0
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "MXN",
        lowPrice: Math.min(...product.variants.map((v) => v.price)),
        highPrice: Math.max(...product.variants.map((v) => v.price)),
        offerCount: product.variants.length,
        offers: product.variants.map((v) => ({
          "@type": "Offer",
          url: `${BASE_URL}/productos/${product.slug}`,
          priceCurrency: "MXN",
          price: v.price,
          sku: v.sku,
          name: `${product.name} ${v.label}`,
          availability,
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@type": "Organization", name: "Zumomix" },
        })),
      }
    : {
        "@type": "Offer",
        url: `${BASE_URL}/productos/${product.slug}`,
        priceCurrency: "MXN",
        price: product.salePrice ?? product.price,
        availability,
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "Zumomix" },
      };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images,
    brand: { "@type": "Brand", name: "Zumomix" },
    offers,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("data")
    .order("updated_at", { ascending: false });
  if (error || !data || data.length === 0) return PRODUCTS;
  return data.map((r) => r.data as (typeof PRODUCTS)[number]);
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([getProduct(slug), getAllProducts()]);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const extra = await getExtras(product.slug);

  return (
    <div className="py-12 bg-white min-h-screen">
      <ProductJsonLd product={product} />
      <Container>
        <nav className="text-sm text-neutral-500 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-brand-green transition-colors">Inicio</a>
          <span>/</span>
          <a href="/productos" className="hover:text-brand-green transition-colors">Productos</a>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </nav>

        <ProductDetail product={product} />

        {extra && <ProductExtras extra={extra} />}

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
