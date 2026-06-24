"use client";
import { useState, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  name: string;
  url: string;
}

interface Props {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImagePicker({ label, value, onChange }: Props) {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/admin/images");
      const { images } = await res.json();
      setGallery(images ?? []);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleToggleGallery = () => {
    if (!showGallery) loadGallery();
    setShowGallery((s) => !s);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.url) {
        onChange(json.url);
        // Refresh gallery if open
        if (showGallery) loadGallery();
      } else {
        setUploadError(json.error ?? "Error al subir");
      }
    } catch {
      setUploadError("Error de conexión");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const selectImage = (url: string) => {
    onChange(url);
    setShowGallery(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}

      {/* Input + botones */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/img/... o https://..."
          className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green bg-white"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-brand-green text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {uploading ? (
            <>
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Subiendo…
            </>
          ) : (
            "↑ Subir"
          )}
        </button>
        <button
          type="button"
          onClick={handleToggleGallery}
          className="px-3 py-2 text-xs font-semibold border border-neutral-200 bg-white rounded-lg hover:bg-neutral-50 transition-colors whitespace-nowrap"
        >
          {showGallery ? "✕ Cerrar" : "🖼 Galería"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.webp"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {uploadError && (
        <p className="text-xs text-red-500">{uploadError}</p>
      )}

      {/* Preview de imagen actual */}
      {value && (
        <div className="relative w-20 h-20 bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden shrink-0">
          <Image
            src={value}
            alt="preview"
            fill
            className="object-contain p-1"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      )}

      {/* Galería */}
      {showGallery && (
        <div className="border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100">
            <span className="text-xs font-semibold text-neutral-600">
              {loadingGallery ? "Cargando…" : `${gallery.length} imágenes subidas`}
            </span>
            <button
              type="button"
              onClick={loadGallery}
              className="text-xs text-neutral-400 hover:text-brand-green transition-colors"
            >
              ↺ Actualizar
            </button>
          </div>

          <div className="p-3 max-h-72 overflow-y-auto">
            {loadingGallery ? (
              <div className="flex justify-center py-6">
                <span className="w-5 h-5 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
              </div>
            ) : gallery.length === 0 ? (
              <p className="text-xs text-neutral-400 text-center py-6">
                Sin imágenes aún — sube la primera con el botón ↑
              </p>
            ) : (
              <div className="grid grid-cols-5 gap-2">
                {gallery.map((img) => (
                  <button
                    key={img.name}
                    type="button"
                    onClick={() => selectImage(img.url)}
                    title={img.name}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      value === img.url
                        ? "border-brand-green ring-2 ring-brand-green/30"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {value === img.url && (
                      <span className="absolute inset-0 bg-brand-green/10 flex items-center justify-center text-brand-green text-lg font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
