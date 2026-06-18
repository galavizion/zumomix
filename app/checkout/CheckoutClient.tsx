"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useCustomer } from "@/components/customer/CustomerProvider";
import { formatPrice } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

const PayPalButton = dynamic(
  () => import("@/components/checkout/PayPalButton"),
  { ssr: false }
);

type Step = "contacto" | "envio" | "pago" | "confirmado";

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const { customer } = useCustomer();
  const [step, setStep] = useState<Step>("contacto");
  const [form, setForm] = useState({
    nombre: customer?.nombre || "",
    email: customer?.email || "",
    telefono: customer?.telefono || "",
    calle: customer?.calle || "",
    colonia: customer?.colonia || "",
    ciudad: customer?.ciudad || "",
    estado: customer?.estado || "",
    cp: customer?.cp || "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [colonias, setColonias] = useState<string[]>([]);
  const [cpLoading, setCpLoading] = useState(false);

  useEffect(() => {
    if (form.cp.length !== 5) { setColonias([]); return; }
    setCpLoading(true);
    fetch(`/api/cp/${form.cp}`)
      .then((r) => r.json())
      .then((data) => {
        setColonias(data.colonias ?? []);
        setForm((f) => ({
          ...f,
          colonia: "",
          ciudad: data.municipio || f.ciudad,
          estado: data.estado || f.estado,
        }));
      })
      .catch(() => {})
      .finally(() => setCpLoading(false));
  }, [form.cp]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = (fields: (keyof typeof form)[]) => {
    const newErrors: Partial<typeof form> = {};
    fields.forEach((f) => {
      if (!form[f].trim()) newErrors[f] = "Este campo es requerido";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContacto = () => {
    if (validate(["nombre", "email", "telefono"])) setStep("envio");
  };
  const handleEnvio = () => {
    const fields: (keyof typeof form)[] = ["calle", "ciudad", "estado", "cp"];
    if (colonias.length > 0) fields.push("colonia");
    if (validate(fields)) setStep("pago");
  };

  if (step === "confirmado") {
    return (
      <div className="py-24 bg-white min-h-screen">
        <Container>
          <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-brand-green-light rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-brand-green" />
            </div>
            <h1 className="text-3xl font-display font-bold text-neutral-900">
              Pedido confirmado
            </h1>
            <p className="text-neutral-500">
              Gracias por tu compra, {form.nombre}. Nos pondremos en contacto a través de {form.email} para coordinar los detalles de entrega.
            </p>
            <a href="/">
              <Button size="lg">Volver al inicio</Button>
            </a>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white min-h-screen">
      <Container>
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-8">
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Formulario */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pasos */}
            <div className="flex items-center gap-3 text-sm">
              {(["contacto", "envio", "pago"] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-neutral-300">/</span>}
                  <span className={step === s ? "text-brand-green font-semibold" : "text-neutral-400 capitalize"}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </div>
              ))}
            </div>

            {step === "contacto" && (
              <div className="bg-white border border-neutral-200 rounded-card p-6 space-y-4">
                <h2 className="font-display font-bold text-lg text-neutral-900">Datos de contacto</h2>
                <Input label="Nombre completo" value={form.nombre} onChange={update("nombre")} error={errors.nombre} placeholder="Juan García" />
                <Input label="Email" type="email" value={form.email} onChange={update("email")} error={errors.email} placeholder="juan@empresa.com" />
                <Input label="Teléfono" type="tel" value={form.telefono} onChange={update("telefono")} error={errors.telefono} placeholder="81 1234 5678" />
                <Button size="lg" onClick={handleContacto} className="w-full">Continuar</Button>
              </div>
            )}

            {step === "envio" && (
              <div className="bg-white border border-neutral-200 rounded-card p-6 space-y-4">
                <h2 className="font-display font-bold text-lg text-neutral-900">Dirección de envío</h2>
                <Input label="Calle y número" value={form.calle} onChange={update("calle")} error={errors.calle} placeholder="Av. Constitución 1234" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Ciudad" value={form.ciudad} onChange={update("ciudad")} error={errors.ciudad} placeholder="Monterrey" />
                  <Input label="Estado" value={form.estado} onChange={update("estado")} error={errors.estado} placeholder="Nuevo León" />
                </div>
                <Input label="Código postal" value={form.cp} onChange={update("cp")} error={errors.cp} placeholder="64000" maxLength={5} />
                {(cpLoading || colonias.length > 0) && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700">
                      Colonia
                      {cpLoading && <span className="text-neutral-400 font-normal ml-1">(buscando…)</span>}
                    </label>
                    <select
                      value={form.colonia}
                      onChange={(e) => setForm((f) => ({ ...f, colonia: e.target.value }))}
                      disabled={cpLoading}
                      className="w-full px-4 py-2.5 rounded-card border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all duration-300 disabled:opacity-50"
                    >
                      <option value="">Selecciona una colonia</option>
                      {colonias.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.colonia && <span className="text-xs text-red-500">{errors.colonia}</span>}
                  </div>
                )}
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep("contacto")}>Atrás</Button>
                  <Button size="lg" onClick={handleEnvio} className="flex-1">Continuar</Button>
                </div>
              </div>
            )}

            {step === "pago" && (
              <div className="bg-white border border-neutral-200 rounded-card p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-neutral-900">Pago con PayPal</h2>
                <p className="text-xs text-neutral-400">
                  Pago seguro procesado con cifrado SSL. Tus datos están protegidos.
                </p>
                <div className="bg-neutral-50 rounded-card p-4">
                  <PayPalButton onSuccess={clearCart} />
                </div>
                <Button variant="ghost" onClick={() => setStep("envio")} className="w-full">
                  Atrás
                </Button>
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="bg-neutral-50 rounded-card p-6 h-fit sticky top-24">
            <h3 className="font-display font-bold text-neutral-900 mb-4">Tu pedido</h3>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm py-2 border-b border-neutral-200">
                <span className="text-neutral-700 truncate pr-2">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="font-semibold text-neutral-900 shrink-0">
                  {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-base pt-3 text-neutral-900">
              <span>Total</span>
              <span className="text-brand-green">{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
