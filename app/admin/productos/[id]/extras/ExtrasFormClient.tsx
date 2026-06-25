"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { ProductExtra, Highlight, Benefit, VideoItem, SpecRow, Testimonial } from "@/lib/productExtras";

const ImagePicker = dynamic(() => import("@/components/admin/ImagePicker"), { ssr: false });

/* ── helpers ─────────────────────────────────────── */
const green = "rgb(122, 181, 54)";
const inputCls =
  "w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green bg-white";
const labelCls = "block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1";

function Field({ label, value, onChange, multiline, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} rows={3}
            className={inputCls + " resize-none"} />
        : <input value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} className={inputCls} />}
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <ImagePicker value={value} onChange={onChange} />
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors ${checked ? "bg-brand-green" : "bg-neutral-300"}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-1"}`} />
      </div>
      <span className="text-sm font-medium text-neutral-700">{label}</span>
    </label>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors"
      >
        <span className="font-semibold text-neutral-900 text-sm">{title}</span>
        <span className="text-neutral-400 text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 flex flex-col gap-4 border-t border-neutral-100">{children}</div>}
    </div>
  );
}

function AddBtn({ onClick, label = "Agregar" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick}
      className="text-xs font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed border-neutral-300 text-neutral-500 hover:border-brand-green hover:text-brand-green transition-colors">
      + {label}
    </button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="text-xs font-semibold px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0">
      ✕
    </button>
  );
}

function ItemCard({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="border border-neutral-200 rounded-lg p-4 flex flex-col gap-3 bg-neutral-50">
      <div className="flex justify-end"><RemoveBtn onClick={onRemove} /></div>
      {children}
    </div>
  );
}

/* ── main component ──────────────────────────────── */
interface Props {
  slug: string;
  initial: ProductExtra;
}

export default function ExtrasFormClient({ slug, initial }: Props) {
  const [data, setData] = useState<ProductExtra>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof ProductExtra>(key: K, value: ProductExtra[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  function listSet<T>(key: keyof ProductExtra, index: number, patch: Partial<T>) {
    setData((d) => {
      const arr = [...((d[key] as T[]) ?? [])] as T[];
      arr[index] = { ...arr[index], ...patch };
      return { ...d, [key]: arr };
    });
  }
  function listAdd<T>(key: keyof ProductExtra, item: T) {
    setData((d) => ({ ...d, [key]: [...((d[key] as T[]) ?? []), item] }));
  }
  function listRemove(key: keyof ProductExtra, index: number) {
    setData((d) => {
      const arr = [...((d[key] as unknown[]) ?? [])];
      arr.splice(index, 1);
      return { ...d, [key]: arr };
    });
  }

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/product-extras/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl flex flex-col gap-5">

      {/* header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">Slug: <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs">{slug}</code></p>
        <button
          type="button" onClick={handleSave} disabled={saving}
          className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition-colors"
          style={{ background: saved ? "#6b8f3a" : green }}>
          {saving ? "Guardando…" : saved ? "✓ Guardado" : "Guardar cambios"}
        </button>
      </div>

      {/* ─── 1. Título sección "¿Por qué?" ─────────── */}
      <Section title="Título '¿Por qué somos mejores?'">
        <Field label="Título" value={data.whyBetterTitle ?? ""}
          onChange={(v) => set("whyBetterTitle", v || undefined)}
          placeholder="¿Por qué nuestra máquina es mejor?" />
      </Section>

      {/* ─── 2. Benefits (iconos) ───────────────────── */}
      <Section title="Benefits — iconos/infografías">
        {(data.benefits ?? []).map((b, i) => (
          <ItemCard key={i} onRemove={() => listRemove("benefits", i)}>
            <Field label="Título" value={b.title}
              onChange={(v) => listSet<Benefit>("benefits", i, { title: v })} />
            <ImageField label="Imagen"
              value={b.image ?? ""}
              onChange={(v) => listSet<Benefit>("benefits", i, { image: v || undefined })} />
          </ItemCard>
        ))}
        <AddBtn label="Agregar benefit" onClick={() =>
          listAdd<Benefit>("benefits", { title: "", image: "", imageWidth: 120, imageHeight: 120 })} />
      </Section>

      {/* ─── 3. Highlights ──────────────────────────── */}
      <Section title="Highlights — tarjetas con foto">
        {(data.highlights ?? []).map((h, i) => (
          <ItemCard key={i} onRemove={() => listRemove("highlights", i)}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Ícono (emoji)" value={h.icon ?? ""}
                onChange={(v) => listSet<Highlight>("highlights", i, { icon: v || undefined })} placeholder="🔩" />
              <Field label="Título" value={h.title}
                onChange={(v) => listSet<Highlight>("highlights", i, { title: v })} />
            </div>
            <ImageField label="Imagen"
              value={h.image ?? ""}
              onChange={(v) => listSet<Highlight>("highlights", i, { image: v || undefined })} />
            <Field label="Descripción" value={h.desc} multiline
              onChange={(v) => listSet<Highlight>("highlights", i, { desc: v })} />
          </ItemCard>
        ))}
        <AddBtn label="Agregar highlight" onClick={() =>
          listAdd<Highlight>("highlights", { title: "", desc: "", icon: "" })} />
      </Section>

      {/* ─── 4. Textos extra ────────────────────────── */}
      <Section title="Textos extra">
        {(data.extraTexts ?? []).map((t, i) => (
          <div key={i} className="flex gap-2 items-start">
            <textarea value={t} rows={2} onChange={(e) => {
              const arr = [...(data.extraTexts ?? [])];
              arr[i] = e.target.value;
              set("extraTexts", arr);
            }} className={inputCls + " resize-none flex-1"} />
            <RemoveBtn onClick={() => listRemove("extraTexts", i)} />
          </div>
        ))}
        <AddBtn label="Agregar texto" onClick={() =>
          set("extraTexts", [...(data.extraTexts ?? []), ""])} />
      </Section>

      {/* ─── 5. Promo cross-sell ────────────────────── */}
      <Section title="Promo cross-sell" defaultOpen={false}>
        <Toggle label="Mostrar promo"
          checked={!!data.promo}
          onChange={(v) => set("promo", v ? { title: "", bullets: [], linkHref: "", linkLabel: "" } : undefined)} />
        {data.promo && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Badge (etiqueta)" value={data.promo.badge ?? ""}
                onChange={(v) => set("promo", { ...data.promo!, badge: v || undefined })} />
              <Field label="Título" value={data.promo.title}
                onChange={(v) => set("promo", { ...data.promo!, title: v })} />
            </div>
            <ImageField label="Imagen promo"
              value={data.promo.image ?? ""}
              onChange={(v) => set("promo", { ...data.promo!, image: v || undefined })} />
            <div className="flex flex-col gap-2">
              <label className={labelCls}>Bullets</label>
              {(data.promo.bullets ?? []).map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input value={b} onChange={(e) => {
                    const arr = [...data.promo!.bullets];
                    arr[i] = e.target.value;
                    set("promo", { ...data.promo!, bullets: arr });
                  }} className={inputCls + " flex-1"} />
                  <RemoveBtn onClick={() => {
                    const arr = [...data.promo!.bullets];
                    arr.splice(i, 1);
                    set("promo", { ...data.promo!, bullets: arr });
                  }} />
                </div>
              ))}
              <AddBtn label="Agregar bullet" onClick={() =>
                set("promo", { ...data.promo!, bullets: [...data.promo!.bullets, ""] })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Link href" value={data.promo.linkHref}
                onChange={(v) => set("promo", { ...data.promo!, linkHref: v })} />
              <Field label="Link label" value={data.promo.linkLabel}
                onChange={(v) => set("promo", { ...data.promo!, linkLabel: v })} />
            </div>
          </>
        )}
      </Section>

      {/* ─── 6. Testimoniales ───────────────────────── */}
      <Section title="Testimoniales — casos de éxito">
        <Toggle label="Mostrar sección de testimoniales"
          checked={!!data.showTestimonials}
          onChange={(v) => set("showTestimonials", v || undefined)} />
        {data.showTestimonials && (
          <>
            {(data.testimonials ?? []).map((t, i) => (
              <ItemCard key={i} onRemove={() => listRemove("testimonials", i)}>
                <ImageField label="Imagen"
                  value={t.src}
                  onChange={(v) => listSet<Testimonial>("testimonials", i, { src: v })} />
                <Field label="Caption / texto" value={t.caption}
                  onChange={(v) => listSet<Testimonial>("testimonials", i, { caption: v })} />
              </ItemCard>
            ))}
            <AddBtn label="Agregar testimonial" onClick={() =>
              listAdd<Testimonial>("testimonials", { src: "", caption: "" })} />
          </>
        )}
      </Section>

      {/* ─── 7. Refacciones ─────────────────────────── */}
      <Section title="Banner de refacciones">
        <Toggle label="Mostrar banner 'Contamos con refacciones'"
          checked={!!data.showRefacciones}
          onChange={(v) => set("showRefacciones", v || undefined)} />
        {data.showRefacciones && (
          <>
            <label className={labelCls}>Imágenes del banner (máx. 2)</label>
            {(data.refaccionesImages ?? []).map((img, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">Imagen {i + 1}</span>
                  <RemoveBtn onClick={() => listRemove("refaccionesImages", i)} />
                </div>
                <ImagePicker
                  value={img}
                  onChange={(v) => {
                    const arr = [...(data.refaccionesImages ?? [])];
                    arr[i] = v;
                    set("refaccionesImages", arr);
                  }}
                />
              </div>
            ))}
            {(data.refaccionesImages ?? []).length < 2 && (
              <AddBtn label="Agregar imagen" onClick={() =>
                set("refaccionesImages", [...(data.refaccionesImages ?? []), ""])} />
            )}
          </>
        )}
      </Section>

      {/* ─── 8. Videos ──────────────────────────────── */}
      <Section title="Videos de YouTube">
        {(data.videos ?? []).map((v, i) => (
          <ItemCard key={i} onRemove={() => listRemove("videos", i)}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="ID del video" value={v.videoId}
                onChange={(val) => listSet<VideoItem>("videos", i, { videoId: val })}
                placeholder="ej. dQw4w9WgXcQ" />
              <Field label="Título" value={v.title}
                onChange={(val) => listSet<VideoItem>("videos", i, { title: val })} />
            </div>
          </ItemCard>
        ))}
        <AddBtn label="Agregar video" onClick={() =>
          listAdd<VideoItem>("videos", { videoId: "", title: "" })} />
      </Section>

      {/* ─── 9. Ficha técnica ───────────────────────── */}
      <Section title="Ficha técnica">
        <Field label="Título de la ficha" value={data.specTitle ?? ""}
          onChange={(v) => set("specTitle", v || undefined)}
          placeholder="Ficha técnica Business 1 Plus" />
        <ImageField label="Imagen de ficha técnica"
          value={data.specImage ?? ""}
          onChange={(v) => set("specImage", v || undefined)} />

        <div className="flex flex-col gap-2">
          <label className={labelCls}>Especificaciones (filas)</label>
          {(data.specs ?? []).map((s, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={s.label} placeholder="Etiqueta"
                onChange={(e) => listSet<SpecRow>("specs", i, { label: e.target.value })}
                className={inputCls + " flex-1"} />
              <input value={s.value} placeholder="Valor"
                onChange={(e) => listSet<SpecRow>("specs", i, { value: e.target.value })}
                className={inputCls + " flex-1"} />
              <RemoveBtn onClick={() => listRemove("specs", i)} />
            </div>
          ))}
          <AddBtn label="Agregar fila" onClick={() =>
            listAdd<SpecRow>("specs", { label: "", value: "" })} />
        </div>
      </Section>

      {/* save bottom */}
      <div className="flex justify-end pb-8">
        <button
          type="button" onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors"
          style={{ background: saved ? "#6b8f3a" : green }}>
          {saving ? "Guardando…" : saved ? "✓ Guardado" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
