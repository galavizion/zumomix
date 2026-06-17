"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCustomer } from "@/components/customer/CustomerProvider";
import { UserCircle, LogOut, Package } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { customer, loading, logout, updateProfile } = useCustomer();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    nombre: customer?.nombre || "",
    telefono: customer?.telefono || "",
    calle: customer?.calle || "",
    ciudad: customer?.ciudad || "",
    estado: customer?.estado || "",
    cp: customer?.cp || "",
  });

  if (loading) {
    return (
      <div className="py-20 min-h-screen bg-white">
        <Container>
          <p className="text-center text-neutral-500">Cargando...</p>
        </Container>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="py-20 min-h-screen bg-white">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <p className="text-neutral-500 mb-4">Debes iniciar sesión primero</p>
            <Link href="/auth">
              <Button size="lg">Ir a login</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile(form);
      setMessage("✅ Perfil actualizado");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setMessage("❌ Error al actualizar");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-green-light rounded-full flex items-center justify-center">
                <UserCircle size={32} className="text-brand-green" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-neutral-900">
                  {customer.nombre}
                </h1>
                <p className="text-neutral-500">{customer.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Perfil */}
            <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
                Mi información
              </h2>

              {message && (
                <div
                  className={`p-3 rounded-lg mb-4 text-sm ${
                    message.includes("✅")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <Input
                  label="Nombre completo"
                  value={form.nombre}
                  onChange={(e) =>
                    setForm({ ...form, nombre: e.target.value })
                  }
                />
                <Input
                  label="Teléfono"
                  type="tel"
                  value={form.telefono}
                  onChange={(e) =>
                    setForm({ ...form, telefono: e.target.value })
                  }
                />

                <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-3">
                  Dirección de envío
                </h3>

                <Input
                  label="Calle y número"
                  value={form.calle}
                  onChange={(e) => setForm({ ...form, calle: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ciudad"
                    value={form.ciudad}
                    onChange={(e) =>
                      setForm({ ...form, ciudad: e.target.value })
                    }
                  />
                  <Input
                    label="Estado"
                    value={form.estado}
                    onChange={(e) =>
                      setForm({ ...form, estado: e.target.value })
                    }
                  />
                </div>

                <Input
                  label="Código postal"
                  value={form.cp}
                  onChange={(e) => setForm({ ...form, cp: e.target.value })}
                />

                <Button size="lg" disabled={saving} className="w-full">
                  {saving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </form>
            </div>

            {/* Pedidos recientes */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package size={20} className="text-brand-green" />
                <h3 className="text-lg font-semibold text-neutral-900">
                  Mis pedidos
                </h3>
              </div>
              <Link
                href="/perfil/pedidos"
                className="text-brand-green font-semibold hover:underline"
              >
                Ver todos los pedidos →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
