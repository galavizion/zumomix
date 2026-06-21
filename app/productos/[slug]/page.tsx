import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ProductDetail from "@/components/products/ProductDetail";
import ProductCard from "@/components/products/ProductCard";
import ProductExtras from "@/components/products/ProductExtras";
import productExtras from "@/lib/productExtras";
import { PRODUCTS } from "@/lib/constants";

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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images,
    brand: { "@type": "Brand", name: "Zumomix" },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/productos/${product.slug}`,
      priceCurrency: "MXN",
      price: product.salePrice ?? product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Zumomix" },
    },
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

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

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

        {productExtras[product.slug] && <ProductExtras extra={productExtras[product.slug]} />}

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
