"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = false }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="bg-white rounded-card border border-neutral-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group flex flex-col">
      <Link href={`/productos/${product.slug}`} className="block overflow-hidden bg-white aspect-4/3">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={480}
          height={360}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <Link href={`/productos/${product.slug}`}>
            <h3 className="font-display font-700 text-neutral-900 group-hover:text-brand-green transition-colors duration-300 text-base leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-neutral-500 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
        {product.price > 0 && (
          <p className="text-brand-green font-semibold text-lg">
            {formatPrice(product.price)}
          </p>
        )}
        <div className="flex gap-2">
          <Link href={`/productos/${product.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Ver más
            </Button>
          </Link>
          {showAddToCart && (
            <Button
              size="sm"
              onClick={() => addItem(product, 1)}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <ShoppingCart size={16} />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
