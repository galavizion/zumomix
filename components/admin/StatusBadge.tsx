import type { OrderStatus } from "@/types";

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
  procesando: { label: "Procesando", className: "bg-blue-100 text-blue-700" },
  enviado: { label: "Enviado", className: "bg-purple-100 text-purple-700" },
  completado: { label: "Completado", className: "bg-brand-green-light text-brand-green-dark" },
  cancelado: { label: "Cancelado", className: "bg-red-100 text-red-600" },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, className } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
