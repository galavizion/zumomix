"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export default function CartSummary() {
  const { subtotal } = useCart();
  const shipping = subtotal > 0 ? "Por calcular" : "—";

  return (
    <div className="bg-neutral-50 rounded-card p-6 sticky top-24">
      <h2 className="font-display font-bold text-lg text-neutral-900 mb-5">
        Resumen del pedido
      </h2>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-neutral-700">
          <span>Subtotal</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral-700">
          <span>Envío</span>
          <span className="font-semibold">{shipping}</span>
        </div>
        <div className="border-t border-neutral-200 pt-3 flex justify-between text-neutral-900 font-bold text-base">
          <span>Total</span>
          <span className="text-brand-green">{formatPrice(subtotal)}</span>
        </div>
      </div>
      <Link href="/checkout" className="block mt-6">
        <Button size="lg" className="w-full">
          Proceder al pago
        </Button>
      </Link>
      <Link href="/productos" className="block mt-3">
        <Button variant="ghost" size="md" className="w-full">
          Seguir comprando
        </Button>
      </Link>
    </div>
  );
}
