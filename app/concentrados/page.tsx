import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import {
  CONCENTRADOS_FLAVORS,
  CONTACT,
  PRESENTACIONES_CONCENTRADOS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Concentrados naturales",
  description: "Más de 30 sabores de concentrados naturales para aguas frescas. Fresa-kiwi, pepino-limón, mango, maracuyá y más.",
};

export default function ConcentradosPage() {
  const waMessage = encodeURIComponent("Hola, me interesa cotizar concentrados naturales Zumomix.");

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-brand-green-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white text-brand-green-dark text-xs font-semibold px-3 py-1 rounded-full mb-5">
                +30 sabores disponibles
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5 leading-tight">
                Concentrados naturales para aguas frescas
              </h1>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Elaborados con fruta natural seleccionada, sin conservadores artificiales. La solución perfecta para ofrecer aguas frescas de calidad premium en tu negocio.
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">Cotizar concentrados</Button>
              </a>
            </div>
            <div className="relative aspect-square rounded-card overflow-hidden shadow-card-hover">
              <Image
                src="https://www.zumomix.com/wp-content/uploads/2023/01/jugos-zumomix-967x1024.jpg"
                alt="Concentrados naturales Zumomix"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Presentaciones */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-10 text-center">
            Presentaciones disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PRESENTACIONES_CONCENTRADOS.map((p) => (
              <div key={p.title} className="bg-neutral-50 rounded-card p-6 border border-neutral-200">
                <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">{p.title}</h3>
                <p className="text-neutral-500 text-sm mb-3">{p.description}</p>
                <span className="text-xs font-medium text-brand-green bg-brand-green-light px-3 py-1 rounded-full">
                  {p.detail}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sabores */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-3 text-center">
            Sabores disponibles
          </h2>
          <p className="text-neutral-500 text-center mb-10">
            Selección premium de más de 30 sabores naturales
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
            {CONCENTRADOS_FLAVORS.map((flavor) => (
              <span
                key={flavor}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700 hover:border-brand-green hover:text-brand-green transition-colors duration-300 cursor-default"
              >
                {flavor}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-brand-green">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Lleva los mejores sabores a tu negocio
            </h2>
            <p className="mb-8 opacity-90">
              Envío a toda la República Mexicana. Contacta a nuestros asesores para precios por volumen.
            </p>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-3.5 rounded-btn hover:bg-neutral-50 transition-colors duration-300"
            >
              Solicitar cotización
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
