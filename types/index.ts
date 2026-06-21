export interface ProductVariant {
  label: string;
  sku: string;
  price: number;
  salePrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  category: ProductCategory;
  images: string[];
  features?: string[];
  stock: number;
  status: "active" | "draft";
  related?: string[];
  variants?: ProductVariant[];
}

export type ProductCategory =
  | "exprimidores"
  | "dispensadoras"
  | "maquinas"
  | "concentrados";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  itemCount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  notes?: string;
  timeline: OrderEvent[];
}

export type OrderStatus =
  | "pendiente"
  | "procesando"
  | "enviado"
  | "completado"
  | "cancelado";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderEvent {
  status: OrderStatus;
  date: string;
  note?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder?: string;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface StockItem {
  product: Product;
  minStock: number;
  stockStatus: "ok" | "low" | "out";
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface AdminStats {
  ordersToday: number;
  ordersMonth: number;
  revenueMonth: number;
  activeProducts: number;
  totalCustomers: number;
}
