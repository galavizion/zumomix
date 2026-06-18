"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginClient() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error ?? "Error al iniciar sesión");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-card border border-neutral-200 shadow-card w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <span className="text-2xl font-display font-bold text-brand-green">
            zumo<span className="text-neutral-900">mix</span>
          </span>
          <p className="text-sm text-neutral-500 mt-1">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="admin@zumomix.com"
          />
          <Input
            label="Contraseña"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="••••••••"
          />
          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-card">
              {error}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
            {loading ? "Verificando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
}
