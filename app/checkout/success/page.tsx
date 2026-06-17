import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Pago exitoso | Zumomix",
};

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  return (
    <div className="py-24 bg-white min-h-screen">
      <Container>
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-brand-green-light rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-brand-green" />
          </div>
          <h1 className="text-3xl font-display font-bold text-neutral-900">
            ¡Pago exitoso!
          </h1>
          <div className="space-y-2">
            <p className="text-neutral-500">
              Gracias por tu compra. Tu pedido ha sido confirmado.
            </p>
            {searchParams.orderId && (
              <p className="text-sm text-neutral-400">
                ID de orden: {searchParams.orderId}
              </p>
            )}
          </div>
          <p className="text-sm text-neutral-500">
            Te enviaremos un correo de confirmación con los detalles de tu pedido y
            el seguimiento del envío.
          </p>
          <Link href="/">
            <Button size="lg">Volver al inicio</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
