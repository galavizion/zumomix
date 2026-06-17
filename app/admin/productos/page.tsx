import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function AdminProductosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{PRODUCTS.length} productos en total</p>
        <Link href="/admin/productos/nuevo">
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Agregar producto
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-card border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {["Producto", "SKU", "Precio", "Stock", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-card overflow-hidden flex-shrink-0">
                        <Image src={p.images[0]} alt={p.name} width={40} height={40} className="w-full h-full object-contain p-1" />
                      </div>
                      <span className="font-medium text-neutral-900 leading-tight">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3 font-semibold text-neutral-900">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${p.stock <= 3 ? "text-red-500" : p.stock <= 8 ? "text-yellow-600" : "text-brand-green"}`}>
                      {p.stock} uds.
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={p.status === "active" ? "green" : "gray"}>
                      {p.status === "active" ? "Activo" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/productos/${p.id}`}>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
