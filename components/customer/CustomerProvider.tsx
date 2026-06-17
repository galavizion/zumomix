"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Customer } from "@/types/customer";

interface CustomerContextType {
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nombre: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | null>(null);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay cliente logueado al cargar
    const token = localStorage.getItem("customer_token");
    if (token) {
      fetchCustomer();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await fetch("/api/customer/me");
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
      } else {
        localStorage.removeItem("customer_token");
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error en el login");
    }

    const data = await response.json();
    localStorage.setItem("customer_token", data.token);
    setCustomer(data.customer);
  };

  const register = async (
    email: string,
    password: string,
    nombre: string
  ) => {
    const response = await fetch("/api/customer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nombre }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error en el registro");
    }

    const data = await response.json();
    localStorage.setItem("customer_token", data.token);
    setCustomer(data.customer);
  };

  const logout = () => {
    localStorage.removeItem("customer_token");
    setCustomer(null);
  };

  const updateProfile = async (data: Partial<Customer>) => {
    const response = await fetch("/api/customer/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error updating profile");
    }

    const updated = await response.json();
    setCustomer(updated);
  };

  return (
    <CustomerContext.Provider
      value={{ customer, loading, login, register, logout, updateProfile }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer debe usarse dentro de CustomerProvider");
  }
  return context;
}
