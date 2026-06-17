"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

export default function CartItemRow({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart();
  const price = item.product.salePrice ?? item.product.price;

  return (
    <div className="flex gap-4 py-5 border-b border-neutral-200 last:border-0">
      <div className="w-20 h-20 bg-neutral-50 rounded-card overflow-hidden flex-shrink-0">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          width={80}
          height={80}
          className="w-full h-full object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
          {item.product.name}
        </h3>
        <p className="text-xs text-neutral-500 mt-1">{item.product.shortDescription}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-neutral-200 rounded-card overflow-hidden">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 text-sm"
              aria-label="Reducir"
            >
              -
            </button>
            <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 text-sm"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-brand-green">
              {formatPrice(price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.product.id)}
              className="text-neutral-400 hover:text-red-500 transition-colors"
              aria-label="Eliminar producto"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
