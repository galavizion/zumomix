import type { Order, Customer, AdminStats, SalesData } from "@/types";
import { PRODUCTS } from "./constants";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

async function fetchAdmin(path: string) {
  if (!MEDUSA_URL) return null;
  try {
    const res = await fetch(`${MEDUSA_URL}/admin${path}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getAdminStats(): Promise<AdminStats> {
  const data = await fetchAdmin("/analytics");
  if (data) return data;
  return MOCK_STATS;
}

export async function getOrders(): Promise<Order[]> {
  const data = await fetchAdmin("/orders");
  if (data?.orders) return data.orders;
  return MOCK_ORDERS;
}

export async function getOrder(id: string): Promise<Order | null> {
  const data = await fetchAdmin(`/orders/${id}`);
  if (data?.order) return data.order;
  return MOCK_ORDERS.find((o) => o.id === id) ?? null;
}

export async function updateOrderStatus(id: string, status: string) {
  const data = await fetchAdmin(`/orders/${id}`);
  return data?.order ?? null;
}

export async function getCustomers(): Promise<Customer[]> {
  const data = await fetchAdmin("/customers");
  if (data?.customers) return data.customers;
  return MOCK_CUSTOMERS;
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const data = await fetchAdmin(`/customers/${id}`);
  if (data?.customer) return data.customer;
  return MOCK_CUSTOMERS.find((c) => c.id === id) ?? null;
}

export async function getSalesData(): Promise<SalesData[]> {
  const data = await fetchAdmin("/analytics/sales");
  if (data?.sales) return data.sales;
  return MOCK_SALES;
}

export async function getAdminProducts() {
  const data = await fetchAdmin("/products");
  if (data?.products) return data.products;
  return PRODUCTS;
}

const MOCK_STATS: AdminStats = {
  ordersToday: 3,
  ordersMonth: 47,
  revenueMonth: 892500,
  activeProducts: 6,
  totalCustomers: 128,
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "#2401",
    date: "2024-01-15T10:30:00",
    customer: {
      id: "cust-001",
      name: "Restaurante El Taco Loco",
      email: "compras@tacoloco.mx",
      phone: "81 8765 4321",
      orders: 3,
      totalSpent: 85500,
      createdAt: "2023-09-01",
    },
    items: [
      { product: PRODUCTS[0], quantity: 2, price: 18500 },
      { product: PRODUCTS[3], quantity: 1, price: 15800 },
    ],
    subtotal: 52800,
    shipping: 1200,
    total: 54000,
    status: "completado",
    shippingAddress: {
      street: "Av. Constitución 1234",
      city: "Monterrey",
      state: "Nuevo León",
      zip: "64000",
      country: "México",
    },
    timeline: [
      { status: "pendiente", date: "2024-01-15T10:30:00" },
      { status: "procesando", date: "2024-01-15T11:00:00" },
      { status: "enviado", date: "2024-01-16T09:00:00" },
      { status: "completado", date: "2024-01-17T14:30:00" },
    ],
  },
  {
    id: "ord-002",
    orderNumber: "#2402",
    date: "2024-01-16T14:15:00",
    customer: {
      id: "cust-002",
      name: "Hoteles Misión GDL",
      email: "adquisiciones@mision.com",
      phone: "33 3456 7890",
      orders: 7,
      totalSpent: 245000,
      createdAt: "2023-06-15",
    },
    items: [{ product: PRODUCTS[2], quantity: 3, price: 32000 }],
    subtotal: 96000,
    shipping: 2500,
    total: 98500,
    status: "enviado",
    shippingAddress: {
      street: "Av. López Mateos 5678",
      city: "Guadalajara",
      state: "Jalisco",
      zip: "44600",
      country: "México",
    },
    timeline: [
      { status: "pendiente", date: "2024-01-16T14:15:00" },
      { status: "procesando", date: "2024-01-16T15:00:00" },
      { status: "enviado", date: "2024-01-17T10:00:00" },
    ],
  },
  {
    id: "ord-003",
    orderNumber: "#2403",
    date: "2024-01-17T09:00:00",
    customer: {
      id: "cust-003",
      name: "Jugos La Palma",
      email: "palma@jugos.mx",
      phone: "81 9876 5432",
      orders: 1,
      totalSpent: 28500,
      createdAt: "2024-01-17",
    },
    items: [{ product: PRODUCTS[4], quantity: 1, price: 28500 }],
    subtotal: 28500,
    shipping: 800,
    total: 29300,
    status: "procesando",
    shippingAddress: {
      street: "Calle Morelos 456",
      city: "Monterrey",
      state: "Nuevo León",
      zip: "64700",
      country: "México",
    },
    timeline: [
      { status: "pendiente", date: "2024-01-17T09:00:00" },
      { status: "procesando", date: "2024-01-17T10:30:00" },
    ],
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "cust-001",
    name: "Restaurante El Taco Loco",
    email: "compras@tacoloco.mx",
    phone: "81 8765 4321",
    orders: 3,
    totalSpent: 85500,
    lastOrder: "2024-01-15",
    createdAt: "2023-09-01",
  },
  {
    id: "cust-002",
    name: "Hoteles Misión GDL",
    email: "adquisiciones@mision.com",
    phone: "33 3456 7890",
    orders: 7,
    totalSpent: 245000,
    lastOrder: "2024-01-16",
    createdAt: "2023-06-15",
  },
  {
    id: "cust-003",
    name: "Jugos La Palma",
    email: "palma@jugos.mx",
    phone: "81 9876 5432",
    orders: 1,
    totalSpent: 28500,
    lastOrder: "2024-01-17",
    createdAt: "2024-01-17",
  },
  {
    id: "cust-004",
    name: "Cafetería Universidad UANL",
    email: "cafeteria@uanl.mx",
    phone: "81 1234 5678",
    orders: 5,
    totalSpent: 152000,
    lastOrder: "2024-01-10",
    createdAt: "2023-03-20",
  },
  {
    id: "cust-005",
    name: "La Michoacana Express",
    email: "pedidos@michoacanaexpress.com",
    phone: "33 2345 6789",
    orders: 12,
    totalSpent: 380000,
    lastOrder: "2024-01-12",
    createdAt: "2022-11-08",
  },
];

export const MOCK_SALES: SalesData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    sales: Math.floor(Math.random() * 80000) + 20000,
    orders: Math.floor(Math.random() * 5) + 1,
  };
});
