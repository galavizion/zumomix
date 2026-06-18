export interface Customer {
  id: string;
  email: string;
  nombre: string;
  telefono?: string;
  calle?: string;
  ciudad?: string;
  estado?: string;
  cp?: string;
  colonia?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  total: number;
  status: "pendiente" | "confirmado" | "enviado" | "entregado" | "cancelado";
  payment_method: string;
  payment_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
}
