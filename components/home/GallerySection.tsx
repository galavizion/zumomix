import Image from "next/image";
import Container from "@/components/ui/Container";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function GallerySection() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
            Nuestros equipos en acción
          </h2>
          <p className="text-neutral-500">
            Instalaciones reales de nuestros clientes en todo México
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <Image
                src={src}
                alt={`Equipo Zumomix en instalación ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
