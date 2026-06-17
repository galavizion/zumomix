import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-8xl font-display font-bold text-neutral-200 mb-4">404</h1>
      <h2 className="text-2xl font-display font-bold text-neutral-900 mb-3">
        Página no encontrada
      </h2>
      <p className="text-neutral-500 max-w-sm mb-8">
        La página que buscas no existe o fue movida. Vuelve al inicio para explorar nuestros productos.
      </p>
      <Link href="/">
        <Button size="lg">Volver al inicio</Button>
      </Link>
    </div>
  );
}
