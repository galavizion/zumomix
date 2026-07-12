"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { DEFAULT_CAROUSEL, type CarouselItem } from "@/components/home/HeroCarousel";

const ImagePicker = dynamic(() => import("@/components/admin/ImagePicker"), { ssr: false });

interface Section {
  id: string;
  section: string;
  content: Record<string, any>;
  updated_at: string;
}

const sections = [
  {
    name: "hero",
    label: "Hero",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Subtítulo (verde)", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
    ],
  },
  {
    name: "promo",
    label: "Barra de Promoción",
    fields: [
      { key: "active", label: "Mostrar barra", type: "toggle" },
      { key: "text", label: "Texto principal", type: "text" },
      { key: "showDiscount", label: "Mostrar descuento", type: "toggle" },
      { key: "discount", label: "Descuento (ej. 20% OFF)", type: "text" },
      { key: "description", label: "Texto final", type: "text" },
    ],
  },
  {
    name: "testimonials",
    label: "Testimonios",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "text" },
    ],
  },
  {
    name: "concentrados",
    label: "Banner Concentrados",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
    ],
  },
  {
    name: "action_atomic",
    label: "Video — Exprimidor Atomic",
    fields: [
      { key: "label", label: "Etiqueta (ej. En acción)", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
      { key: "videoId", label: "ID del video YouTube (ej. ktgUkTHa8ag)", type: "text" },
      { key: "bgImage", label: "Imagen de fondo del video (opcional)", type: "image" },
    ],
  },
  {
    name: "action_b1plus",
    label: "Video — Business 1 Plus",
    fields: [
      { key: "label", label: "Etiqueta (ej. En acción)", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
      { key: "videoId", label: "ID del video YouTube (ej. 0CwTeLh8acw)", type: "text" },
      { key: "bgImage", label: "Imagen de fondo del video (opcional)", type: "image" },
    ],
  },
  {
    name: "tranquilidad",
    label: "Tranquilidad",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
      { key: "image", label: "Foto de soporte/refacciones", type: "image" },
    ],
  },
];

/* ── Editor de carrusel ── */
function CarouselEditor({
  items,
  onChange,
}: {
  items: CarouselItem[];
  onChange: (items: CarouselItem[]) => void;
}) {
  const addItem = () => {
    const unused = PRODUCTS.find((p) => !items.some((i) => i.productId === p.id));
    onChange([...items, { productId: unused?.id ?? PRODUCTS[0].id, badge: "Destacado" }]);
  };

  const removeItem = (idx: number) =>
    onChange(items.filter((_, i) => i !== idx));

  const updateItem = (idx: number, key: keyof CarouselItem, val: string) =>
    onChange(items.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));

  const clearImage = (idx: number) =>
    onChange(items.map((item, i) => (i === idx ? { ...item, image: undefined } : item)));

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200"
          >
            {/* Número */}
            <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center shrink-0">
              {idx + 1}
            </span>

            {/* Thumbnail */}
            {product && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-contain rounded-lg bg-white border border-neutral-200 shrink-0"
              />
            )}

            {/* Selects */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <select
                value={item.productId}
                onChange={(e) => updateItem(idx, "productId", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={item.badge}
                onChange={(e) => updateItem(idx, "badge", e.target.value)}
                placeholder="Texto del badge, ej: Más vendido"
                className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <div>
                <p className="text-xs text-neutral-400 mb-1">Foto del carrusel (opcional — si no eliges, usa la primera del producto)</p>
                <ImagePicker
                  value={item.image ?? ""}
                  onChange={(url) => updateItem(idx, "image", url)}
                />
                {item.image && (
                  <button
                    type="button"
                    onClick={() => clearImage(idx)}
                    className="mt-1 text-xs text-red-400 hover:text-red-600"
                  >
                    × Quitar imagen personalizada
                  </button>
                )}
              </div>
            </div>

            {/* Eliminar */}
            <button
              type="button"
              onClick={() => removeItem(idx)}
              disabled={items.length <= 1}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addItem}
        disabled={items.length >= PRODUCTS.length}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-neutral-300 text-sm font-medium text-neutral-500 hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-40"
      >
        <Plus size={16} /> Agregar producto al carrusel
      </button>
    </div>
  );
}

const VISIBILITY_SECTIONS = [
  { key: "products",     label: "Productos destacados",  description: "Grid de productos en el inicio" },
  { key: "testimonials", label: "Testimonios",           description: "Reseñas de clientes" },
  { key: "action",       label: "Sección de Acción",     description: "Banner CTA central" },
  { key: "concentrados", label: "Banner Concentrados",   description: "Sección de concentrados naturales" },
  { key: "clientLogos",  label: "Logos de Clientes",     description: "Galería de marcas / clientes" },
  { key: "tranquilidad", label: "Tranquilidad en tu compra", description: "Sección de soporte y refacciones" },
  { key: "gallery",      label: "Galería",               description: "Galería de imágenes" },
  { key: "contact",      label: "Sección Contacto",      description: "Formulario de contacto en inicio" },
];

/* ── Página principal ── */
export default function InicioClient() {
  const [sectionData, setSectionData] = useState<Record<string, Section>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch("/api/home");
      const data = await response.json();
      setSectionData(data);
    } catch (error) {
      console.error("Error fetching sections:", error);
      setMessage("Error al cargar las secciones");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (sectionName: string) => {
    setSaving(true);
    try {
      const section = sectionData[sectionName] ?? { content: {} };
      const response = await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionName, content: section.content }),
      });
      if (!response.ok) throw new Error("Error saving");
      setMessage("✅ Guardado exitosamente");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      setMessage("❌ Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (sectionName: string, key: string, value: string | boolean) => {
    setSectionData((prev) => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        content: { ...prev[sectionName]?.content, [key]: value },
      },
    }));
  };

  const handleVisibilityChange = (key: string, value: boolean) => {
    setSectionData((prev) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        id: prev.visibility?.id ?? "",
        section: "visibility",
        updated_at: prev.visibility?.updated_at ?? new Date().toISOString(),
        content: { ...prev.visibility?.content, [key]: value },
      },
    }));
  };

  const handleCarouselChange = (items: CarouselItem[]) => {
    setSectionData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        content: { ...prev.hero?.content, carousel: items },
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral-500">Cargando secciones...</p>
      </div>
    );
  }

  const currentSection = sections.find((s) => s.name === activeTab);
  const currentData = sectionData[activeTab] ?? { id: "", section: activeTab, content: {}, updated_at: "" };

  const carouselItems: CarouselItem[] =
    sectionData.hero?.content?.carousel ?? DEFAULT_CAROUSEL;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Inicio</h1>
        <p className="text-neutral-500">Edita las secciones de la página principal</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {sections.map((section) => {
          const d = sectionData[section.name];
          return (
            <button
              key={section.name}
              onClick={() => setActiveTab(section.name)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                activeTab === section.name
                  ? "border-brand-green bg-brand-green/5"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="font-semibold text-sm">{section.label}</div>
              {d && (
                <div className="text-xs text-neutral-400 mt-1">
                  {new Date(d.updated_at).toLocaleDateString("es-MX")}
                </div>
              )}
            </button>
          );
        })}
        {/* Tab Secciones */}
        <button
          onClick={() => setActiveTab("secciones")}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            activeTab === "secciones"
              ? "border-brand-orange bg-brand-orange/5"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <div className="font-semibold text-sm">Secciones</div>
          <div className="text-xs text-neutral-400 mt-1">Mostrar / ocultar</div>
        </button>
      </div>

      {/* ── Panel Secciones ── */}
      {activeTab === "secciones" && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Secciones del inicio</h2>
            <p className="text-sm text-neutral-500 mt-1">Activa o desactiva cada sección de la página principal.</p>
          </div>
          <div className="divide-y divide-neutral-100">
            {VISIBILITY_SECTIONS.map(({ key, label, description }) => {
              const isOn = sectionData.visibility?.content?.[key] !== false;
              return (
                <div key={key} className="flex items-center justify-between py-4">
                  <div>
                    <div className="text-sm font-semibold text-neutral-800">{label}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{description}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleVisibilityChange(key, !isOn)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${isOn ? "bg-brand-green" : "bg-neutral-300"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isOn ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => handleSave("visibility")}
            disabled={saving}
            className="bg-brand-green text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-brand-green-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      )}

      {currentSection && currentData && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
          <h2 className="text-xl font-bold text-neutral-900">{currentSection.label}</h2>

          {/* Campos de texto */}
          <div className="space-y-4">
            {currentSection.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  {field.label}
                </label>
                {field.type === "toggle" ? (
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div
                      onClick={() => handleChange(activeTab, field.key, !currentData.content[field.key])}
                      className={`relative w-10 h-6 rounded-full transition-colors ${currentData.content[field.key] ? "bg-brand-green" : "bg-neutral-300"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${currentData.content[field.key] ? "translate-x-5" : "translate-x-1"}`} />
                    </div>
                    <span className="text-sm text-neutral-600">{currentData.content[field.key] ? "Sí" : "No"}</span>
                  </label>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={currentData.content[field.key] || ""}
                    onChange={(e) => handleChange(activeTab, field.key, e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                  />
                ) : field.type === "image" ? (
                  <div>
                    <ImagePicker
                      value={currentData.content[field.key] || ""}
                      onChange={(url) => handleChange(activeTab, field.key, url)}
                    />
                    {currentData.content[field.key] && (
                      <button
                        type="button"
                        onClick={() => handleChange(activeTab, field.key, "")}
                        className="mt-1 text-xs text-red-400 hover:text-red-600"
                      >
                        × Quitar imagen
                      </button>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={currentData.content[field.key] || ""}
                    onChange={(e) => handleChange(activeTab, field.key, e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Carrusel — solo aparece en la sección Hero */}
          {activeTab === "hero" && (
            <div>
              <div className="border-t border-neutral-100 pt-6">
                <h3 className="text-base font-bold text-neutral-800 mb-1">
                  Carrusel de productos
                </h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Elige qué productos rotan en la imagen del hero y el texto de su badge.
                </p>
                <CarouselEditor
                  items={carouselItems}
                  onChange={handleCarouselChange}
                />
              </div>
            </div>
          )}

          <button
            onClick={() => handleSave(activeTab)}
            disabled={saving}
            className="bg-brand-green text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-brand-green-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      )}
    </div>
  );
}
