"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { Product } from "@/types";

interface Props {
  product: Product | null;
  isNew: boolean;
}

export default function ProductoFormClient({ product, isNew }: Props) {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    salePrice: product?.salePrice?.toString() ?? "",
    category: product?.category ?? "exprimidores",
    stock: product?.stock?.toString() ?? "",
    status: product?.status ?? "active",
    imageUrl: product?.images[0] ?? "",
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          Volver
        </Button>
        <div className="flex gap-2">
          {!isNew && (
            <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
              Eliminar
            </Button>
          )}
          <Button size="sm" onClick={handleSave}>
            {saved ? "Guardado" : "Guardar cambios"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card flex flex-col gap-5">
          <h2 className="font-display font-bold text-neutral-900">Información general</h2>
          <Input label="Nombre del producto" value={form.name} onChange={update("name")} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="SKU" value={form.sku} onChange={update("sku")} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">Categoría</label>
              <select value={form.category} onChange={update("category")} className="px-4 py-2.5 border border-neutral-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all duration-300">
                {["exprimidores", "dispensadoras", "maquinas", "concentrados"].map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Descripción corta</label>
            <textarea value={form.shortDescription} onChange={update("shortDescription")} rows={2} className="px-4 py-2.5 border border-neutral-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all duration-300 resize-none" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Descripción completa</label>
            <textarea value={form.description} onChange={update("description")} rows={5} className="px-4 py-2.5 border border-neutral-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all duration-300 resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card flex flex-col gap-5">
          <h2 className="font-display font-bold text-neutral-900">Precio e inventario</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Precio (MXN)" type="number" value={form.price} onChange={update("price")} placeholder="18500" />
            <Input label="Precio de oferta (MXN)" type="number" value={form.salePrice} onChange={update("salePrice")} placeholder="Opcional" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Stock" type="number" value={form.stock} onChange={update("stock")} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">Estado</label>
              <select value={form.status} onChange={update("status")} className="px-4 py-2.5 border border-neutral-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition-all duration-300">
                <option value="active">Activo</option>
                <option value="draft">Borrador</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card flex flex-col gap-5">
          <h2 className="font-display font-bold text-neutral-900">Imagen</h2>
          <Input label="URL de imagen" value={form.imageUrl} onChange={update("imageUrl")} placeholder="https://..." />
          {form.imageUrl && (
            <div className="w-40 h-40 bg-neutral-50 rounded-card overflow-hidden border border-neutral-200">
              <Image src={form.imageUrl} alt="Preview" width={160} height={160} className="w-full h-full object-contain p-2" />
            </div>
          )}
        </div>
      </form>

      {showDelete && (
        <ConfirmDialog
          title="Eliminar producto"
          message="Esta acción no se puede deshacer. El producto será eliminado permanentemente."
          onConfirm={() => router.push("/admin/productos")}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
