import Image from "next/image";
import Container from "@/components/ui/Container";
import { CLIENT_LOGOS } from "@/lib/constants";

export default function ClientLogos() {
  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-10">
          Creando éxito juntos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center">
          {CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={180}
                height={90}
                className="object-contain max-h-20 w-auto"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
