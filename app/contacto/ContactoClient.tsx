"use client";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CONTACT, PRODUCTS } from "@/lib/constants";
import { Mail, Phone, CheckCircle } from "lucide-react";

export default function ContactoClient() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", producto: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Contáctanos</h1>
          <p className="text-neutral-500">Estamos aquí para ayudarte a encontrar el equipo ideal para tu negocio.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Formulario */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                <div className="w-16 h-16 bg-brand-green-light rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-brand-green" />
                </div>
                <h2 className="text-xl font-display font-bold text-neutral-900">Mensaje enviado</h2>
                <p className="text-neutral-500 max-w-sm">
                  Gracias, {form.nombre}. Nos pondremos en contacto contigo en menos de 24 horas.
                </p>
                <Button variant="outline" onClick={() => setSent(false)}>Enviar otro mensaje</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Nombre completo" required value={form.nombre} onChange={update("nombre")} placeholder="Juan García" />
                  <Input label="Email" type="email" required value={form.email} onChange={update("email")} placeholder="juan@empresa.com" />
                </div>
                <Input label="Teléfono" type="tel" value={form.telefono} onChange={update("telefono")} placeholder="81 1234 5678" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700">Producto de interés</label>
                  <select
                    value={form.producto}
                    onChange={update("producto")}
                    className="w-full px-4 py-2.5 rounded-card border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Selecciona un producto</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Concentrados">Concentrados naturales</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700">Mensaje</label>
                  <textarea
                    required
                    value={form.mensaje}
                    onChange={update("mensaje")}
                    rows={4}
                    placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                    className="w-full px-4 py-2.5 rounded-card border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>
                <Button type="submit" size="lg">Enviar mensaje</Button>
              </form>
            )}
          </div>

          {/* Info de contacto */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-neutral-50 rounded-card p-6">
              <h2 className="font-display font-bold text-lg text-neutral-900 mb-5">
                Información de contacto
              </h2>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 text-sm text-neutral-700 hover:text-brand-green transition-colors">
                    <Mail size={18} className="shrink-0 mt-0.5 text-brand-green" />
                    <div>
                      <span className="block font-medium">Email</span>
                      <span className="text-neutral-500">{CONTACT.email}</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phoneMonterrey}`} className="flex items-start gap-3 text-sm text-neutral-700 hover:text-brand-green transition-colors">
                    <Phone size={18} className="shrink-0 mt-0.5 text-brand-green" />
                    <div>
                      <span className="block font-medium">Monterrey</span>
                      <span className="text-neutral-500">{CONTACT.phoneMonterrey}</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phoneGuadalajara}`} className="flex items-start gap-3 text-sm text-neutral-700 hover:text-brand-green transition-colors">
                    <Phone size={18} className="shrink-0 mt-0.5 text-brand-green" />
                    <div>
                      <span className="block font-medium">Guadalajara</span>
                      <span className="text-neutral-500">{CONTACT.phoneGuadalajara}</span>
                    </div>
                  </a>
                </li>
              </ul>

              <div className="border-t border-neutral-200 pt-5 mt-5">
                <p className="text-sm font-medium text-neutral-700 mb-3">Síguenos</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.instagram.com/zumomix.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-brand-green transition-colors"
                  >
                    Instagram — {CONTACT.instagram}
                  </a>
                  <a
                    href="https://www.facebook.com/ZumomixExprimidores"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-brand-green transition-colors"
                  >
                    Facebook — {CONTACT.facebook}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-brand-green-light rounded-card p-6">
              <p className="text-sm font-semibold text-brand-green-dark mb-1">Atención inmediata</p>
              <p className="text-sm text-neutral-700 mb-4">
                ¿Necesitas una cotización rápida? Escríbenos por WhatsApp y te respondemos en minutos.
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2.5 rounded-btn hover:bg-[#128C7E] transition-colors duration-300"
              >
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
