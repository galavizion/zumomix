"use client";

import { useEffect, useState } from "react";

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
      { key: "subtitle", label: "Subtítulo", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
    ],
  },
  {
    name: "promo",
    label: "Barra de Promoción",
    fields: [
      { key: "text", label: "Texto", type: "text" },
      { key: "discount", label: "Descuento", type: "text" },
      { key: "description", label: "Descripción", type: "text" },
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
    name: "action",
    label: "Sección de Acción",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
    ],
  },
];

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
      const section = sectionData[sectionName];
      const response = await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: sectionName,
          content: section.content,
        }),
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

  const handleChange = (
    sectionName: string,
    key: string,
    value: string
  ) => {
    setSectionData((prev) => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        content: {
          ...prev[sectionName]?.content,
          [key]: value,
        },
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
  const currentData = sectionData[activeTab];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Inicio</h1>
        <p className="text-neutral-500">Edita las secciones de la página principal</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("✅")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveTab(section.name)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeTab === section.name
                ? "border-brand-green bg-brand-green/5"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className="font-semibold text-sm">{section.label}</div>
            {currentData && (
              <div className="text-xs text-neutral-500 mt-1">
                {new Date(currentData.updated_at).toLocaleDateString("es-MX")}
              </div>
            )}
          </button>
        ))}
      </div>

      {currentSection && currentData && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              {currentSection.label}
            </h2>

            <div className="space-y-4">
              {currentSection.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={currentData.content[field.key] || ""}
                      onChange={(e) =>
                        handleChange(activeTab, field.key, e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentData.content[field.key] || ""}
                      onChange={(e) =>
                        handleChange(activeTab, field.key, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSave(activeTab)}
            disabled={saving}
            className="bg-brand-green text-white font-semibold py-2 px-6 rounded-lg hover:bg-brand-green-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      )}
    </div>
  );
}
