"use client";

import { useEffect, useState } from "react";
import { Save, Globe, Code2, Image as ImageIcon, BarChart3, CheckCircle, AlertCircle } from "lucide-react";

interface Settings {
  site_title: string;
  site_description: string;
  logo_url: string;
  logo_text: string;
  favicon_url: string;
  google_analytics_id: string;
  google_ads_id: string;
  google_search_console: string;
  meta_pixel_id: string;
  tiktok_pixel_id: string;
  custom_head_scripts: string;
}

const DEFAULT: Settings = {
  site_title: "",
  site_description: "",
  logo_url: "",
  logo_text: "zumomix",
  favicon_url: "",
  google_analytics_id: "",
  google_ads_id: "",
  google_search_console: "",
  meta_pixel_id: "",
  tiktok_pixel_id: "",
  custom_head_scripts: "",
};

const TABS = [
  { id: "identidad", label: "Identidad", icon: ImageIcon },
  { id: "seo", label: "SEO", icon: Globe },
  { id: "google", label: "Google", icon: BarChart3 },
  { id: "pixeles", label: "Píxeles", icon: Code2 },
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-neutral-700">{label}</label>
      {hint && <p className="text-xs text-neutral-400 -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all";

const textareaCls = inputCls + " resize-none font-mono text-xs";

export default function AjustesClient() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [tab, setTab] = useState("identidad");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const update = (key: keyof Settings) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSettings((s) => ({ ...s, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (loading) {
    return (
      <p className="text-neutral-400 text-sm">Cargando ajustes...</p>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Ajustes del sitio</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Logo, SEO, Google Analytics, Ads y más
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-green text-white text-sm font-semibold disabled:opacity-60 hover:bg-brand-green-dark transition-colors"
        >
          {status === "ok" ? (
            <><CheckCircle size={16} /> Guardado</>
          ) : status === "error" ? (
            <><AlertCircle size={16} /> Error</>
          ) : (
            <><Save size={16} /> {saving ? "Guardando…" : "Guardar cambios"}</>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 p-1 rounded-xl w-fit flex-wrap">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <Icon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col gap-6">

        {/* ===== IDENTIDAD ===== */}
        {tab === "identidad" && (
          <>
            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-4">Logo y favicon</h2>
              <div className="flex flex-col gap-5">
                <Field
                  label="URL del logo"
                  hint="Pega la URL de tu logo (PNG o SVG con fondo transparente). Sube la imagen a Supabase Storage o a cualquier host de imágenes."
                >
                  <input
                    type="url"
                    value={settings.logo_url}
                    onChange={update("logo_url")}
                    placeholder="https://ejemplo.com/logo.png"
                    className={inputCls}
                  />
                  {settings.logo_url && (
                    <div className="mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={settings.logo_url} alt="Logo preview" className="h-10 w-auto object-contain" />
                      <span className="text-xs text-neutral-400">Vista previa</span>
                    </div>
                  )}
                </Field>

                <Field
                  label="Texto del logo (respaldo)"
                  hint="Se muestra si no hay URL de logo configurada"
                >
                  <input
                    type="text"
                    value={settings.logo_text}
                    onChange={update("logo_text")}
                    placeholder="zumomix"
                    className={inputCls}
                  />
                </Field>

                <Field
                  label="URL del favicon (ícono del navegador)"
                  hint="Imagen cuadrada de 32×32 o 64×64 px (ICO, PNG o SVG)"
                >
                  <input
                    type="url"
                    value={settings.favicon_url}
                    onChange={update("favicon_url")}
                    placeholder="https://ejemplo.com/favicon.ico"
                    className={inputCls}
                  />
                  {settings.favicon_url && (
                    <div className="mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={settings.favicon_url} alt="Favicon preview" className="w-8 h-8 object-contain" />
                      <span className="text-xs text-neutral-400">Vista previa del ícono</span>
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <strong>¿Cómo subir imágenes?</strong> Ve a <strong>Supabase → Storage</strong>, crea un bucket público llamado <code>site-assets</code>, sube tu logo y copia la URL pública.
            </div>
          </>
        )}

        {/* ===== SEO ===== */}
        {tab === "seo" && (
          <>
            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-4">Metadatos del sitio</h2>
              <div className="flex flex-col gap-5">
                <Field
                  label="Título del sitio"
                  hint="Aparece en la pestaña del navegador y en Google. Máx. 60 caracteres."
                >
                  <input
                    type="text"
                    value={settings.site_title}
                    onChange={update("site_title")}
                    placeholder="Zumomix - Exprimidores y dispensadores para tu negocio"
                    className={inputCls}
                    maxLength={80}
                  />
                  <span className="text-xs text-neutral-400 self-end">
                    {settings.site_title.length}/60
                  </span>
                </Field>

                <Field
                  label="Descripción del sitio"
                  hint="Descripción que muestra Google en los resultados de búsqueda. Máx. 160 caracteres."
                >
                  <textarea
                    value={settings.site_description}
                    onChange={update("site_description")}
                    rows={3}
                    placeholder="Equipos profesionales de extracción de jugos naturales..."
                    className={inputCls + " resize-none"}
                    maxLength={200}
                  />
                  <span className="text-xs text-neutral-400 self-end">
                    {settings.site_description.length}/160
                  </span>
                </Field>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-neutral-500 mb-2">Vista previa en Google</p>
              <p className="text-base text-blue-700 font-medium truncate">
                {settings.site_title || "Título del sitio"}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">www.zumomix.com</p>
              <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                {settings.site_description || "Descripción del sitio..."}
              </p>
            </div>
          </>
        )}

        {/* ===== GOOGLE ===== */}
        {tab === "google" && (
          <>
            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-1">Google Search Console</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Para verificar el sitio, Google te da un código de verificación. Cópialo aquí.
              </p>
              <Field
                label="Código de verificación"
                hint='Solo el contenido del meta tag, ej: "abc123XYZ" (sin las comillas ni el tag completo)'
              >
                <input
                  type="text"
                  value={settings.google_search_console}
                  onChange={update("google_search_console")}
                  placeholder="abc123XYZverification"
                  className={inputCls}
                />
              </Field>
            </div>

            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-1">Google Analytics (GA4)</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Mide el tráfico de tu sitio. El ID empieza con <code>G-</code>
              </p>
              <Field label="Measurement ID" hint="Ej: G-XXXXXXXXXX">
                <input
                  type="text"
                  value={settings.google_analytics_id}
                  onChange={update("google_analytics_id")}
                  placeholder="G-XXXXXXXXXX"
                  className={inputCls}
                />
              </Field>
            </div>

            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-1">Google Ads</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Para remarketing y seguimiento de conversiones. El ID empieza con <code>AW-</code>
              </p>
              <Field label="Conversion ID" hint="Ej: AW-XXXXXXXXXX">
                <input
                  type="text"
                  value={settings.google_ads_id}
                  onChange={update("google_ads_id")}
                  placeholder="AW-XXXXXXXXXX"
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Nota:</strong> Los scripts de Google se inyectan automáticamente en todas las páginas al guardar. <strong>Google Merchant Center</strong> sigue funcionando igual — no afecta tu feed de productos.
            </div>
          </>
        )}

        {/* ===== PÍXELES ===== */}
        {tab === "pixeles" && (
          <>
            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-1">Meta (Facebook) Pixel</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Para medir conversiones y crear audiencias en Facebook e Instagram Ads.
              </p>
              <Field label="Pixel ID" hint="Solo el número, ej: 1234567890123456">
                <input
                  type="text"
                  value={settings.meta_pixel_id}
                  onChange={update("meta_pixel_id")}
                  placeholder="1234567890123456"
                  className={inputCls}
                />
              </Field>
            </div>

            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-1">TikTok Pixel</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Para medir conversiones de campañas en TikTok Ads.
              </p>
              <Field label="Pixel ID" hint="Ej: XXXXXXXXXXXXXXXX">
                <input
                  type="text"
                  value={settings.tiktok_pixel_id}
                  onChange={update("tiktok_pixel_id")}
                  placeholder="XXXXXXXXXXXXXXXX"
                  className={inputCls}
                />
              </Field>
            </div>

            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-1">Scripts personalizados</h2>
              <p className="text-sm text-neutral-400 mb-4">
                Agrega cualquier otro script (GTM, Hotjar, etc.). Se inserta en el <code>&lt;head&gt;</code>.
              </p>
              <Field label="JavaScript personalizado" hint="Solo el contenido del script, sin los tags <script>">
                <textarea
                  value={settings.custom_head_scripts}
                  onChange={update("custom_head_scripts")}
                  rows={8}
                  placeholder={"// Pega aquí tu código JavaScript\n// Ejemplo: Google Tag Manager\n(function(w,d,s,l,i){...})(...);"}
                  className={textareaCls}
                />
              </Field>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
