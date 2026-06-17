"use client";
import Link from "next/link";
import Container from "@/components/ui/Container";
import CartItemRow from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

export default function CarritoClient() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-24 bg-white min-h-screen">
        <Container>
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={36} className="text-neutral-400" />
            </div>
            <h1 className="text-2xl font-display font-bold text-neutral-900">
              Tu carrito está vacío
            </h1>
            <p className="text-neutral-500 max-w-sm">
              Aún no has agregado productos. Explora nuestro catálogo y encuentra el equipo ideal para tu negocio.
            </p>
            <Link href="/productos">
              <Button size="lg">Ver productos</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white min-h-screen">
      <Container>
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-10">
          Carrito de compras
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
