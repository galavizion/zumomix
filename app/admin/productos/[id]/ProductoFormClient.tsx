"use client";
import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImagePicker from "@/components/admin/ImagePicker";
import dynamic from "next/dynamic";
import type { Product } from "@/types";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

interface Props {
  product: Product | null;
  isNew: boolean;
}

export default function ProductoFormClient({ product, isNew }: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    images: product?.images ?? [""],
    slug: product?.slug ?? "",
  });

  const update = (key: keyof Omit<typeof form, "images">) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const setImage = (idx: number, url: string) =>
    setForm((f) => { const imgs = [...f.images]; imgs[idx] = url; return { ...f, images: imgs }; });

  const addImage = () => setForm((f) => ({ ...f, images: [...f.images, ""] }));

  const removeImage = (idx: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const buildProduct = (): Product => ({
    ...(product ?? {}),
    id: product?.id ?? crypto.randomUUID(),
    slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
    name: form.name,
    sku: form.sku,
    shortDescription: form.shortDescription,
    description: form.description,
    price: Number(form.price) || 0,
    salePrice: form.salePrice ? Number(form.salePrice) : undefined,
    category: form.category as Product["category"],
    stock: Number(form.stock) || 0,
    status: form.status as Product["status"],
    images: form.images.filter(Boolean),
    features: product?.features ?? [],
    variants: product?.variants,
  });

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = buildProduct();
      const method = isNew ? "POST" : "PUT";
      const url = isNew
        ? "/api/admin/products"
        : `/api/admin/products/${product!.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error((await res.json()).error ?? "Error al guardar");

      setSaved(true);
      setTimeout(() => {
        window.location.href = isNew ? "/admin/productos" : window.location.href.split("?")[0];
      }, 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error al eliminar");
      window.location.href = "/admin/productos";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
      setDeleting(false);
      setShowDelete(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          Volver
        </Button>
        <div className="flex gap-2">
          {!isNew && (
            <>
              <Link href={`/admin/productos/${product?.id}/extras`}>
                <Button variant="ghost" size="sm">Contenido extra</Button>
              </Link>
              <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
                Eliminar
              </Button>
            </>
          )}
          <Button size="sm" onClick={() => handleSave()} disabled={saving}>
            {saving ? "Guardando…" : saved ? "✓ Guardado" : "Guardar cambios"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

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
            <Input label="Slug (URL)" value={form.slug} onChange={update("slug")} placeholder="exprimidor-atomic" />
            <p className="text-xs text-neutral-400 mt-0.5">/productos/<span className="font-medium text-neutral-600">{form.slug || "…"}</span></p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Descripción corta</label>
            <textarea value={form.shortDescription} onChange={update("shortDescription")} rows={2} className="px-4 py-2.5 border border-neutral-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all duration-300 resize-none" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Descripción completa</label>
            <RichEditor
              value={form.description}
              onChange={(html) => setForm((f) => ({ ...f, description: html }))}
            />
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
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-neutral-900">Imágenes</h2>
            <button
              type="button"
              onClick={addImage}
              className="text-xs font-semibold text-brand-green hover:underline"
            >
              + Agregar imagen
            </button>
          </div>
          <p className="text-xs text-neutral-400 -mt-3">La primera imagen es la principal.</p>
          {form.images.map((img, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">
                  {idx === 0 ? "Principal" : `Imagen ${idx + 1}`}
                </span>
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Quitar
                  </button>
                )}
              </div>
              <ImagePicker
                value={img}
                onChange={(url) => setImage(idx, url)}
              />
            </div>
          ))}
        </div>
      </form>

      {showDelete && (
        <ConfirmDialog
          title="Eliminar producto"
          message={`¿Eliminar "${product?.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {deleting && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-sm font-medium text-neutral-700">Eliminando…</div>
        </div>
      )}
    </div>
  );
}
