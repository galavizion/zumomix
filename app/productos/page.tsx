import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/constants";
import type { ProductCategory } from "@/types";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo completo de exprimidores, dispensadoras y máquinas granita Zumomix.",
};

const CATEGORIES: { value: ProductCategory | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "exprimidores", label: "Exprimidores" },
  { value: "dispensadoras", label: "Dispensadoras" },
  { value: "maquinas", label: "Máquinas" },
  { value: "concentrados", label: "Concentrados" },
];

export default function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  return <ProductosContent searchParams={searchParams} />;
}

async function ProductosContent({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const categoria = params.categoria ?? "todos";
  const filtered =
    categoria === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoria);

  return (
    <div className="py-16 bg-white min-h-screen">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Productos
          </h1>
          <p className="text-neutral-500">
            Equipos profesionales para tu negocio
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.value}
              href={cat.value === "todos" ? "/productos" : `/productos?categoria=${cat.value}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                categoria === cat.value
                  ? "bg-brand-green text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-brand-green-light hover:text-brand-green-dark"
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-neutral-500 text-center py-16">
            No hay productos en esta categoría.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
