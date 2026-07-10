export const dynamic = "force-dynamic";

import OrdersClient from "./OrdersClient";

export const metadata = {
  title: "Pedidos | Admin Zumomix",
};

export default function AdminPedidosPage() {
  return <OrdersClient />;
}
