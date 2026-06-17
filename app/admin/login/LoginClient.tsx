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
    await new Promise((r) => setTimeout(r, 500));

    const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@zumomix.com";
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "changeme";

    if (form.email === validEmail && form.password === validPass) {
      document.cookie = "admin-token=valid; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Credenciales incorrectas. Verifica tu email y contraseña.");
    }
    setLoading(false);
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

        <p className="text-xs text-neutral-400 text-center mt-6">
          Credenciales por defecto: admin@zumomix.com / changeme
        </p>
      </div>
    </div>
  );
}
