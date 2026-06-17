"use client";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import type { CartItem, CartState, Product } from "@/types";

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  let items: CartItem[];

  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        items = state.items.map((i) =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + action.quantity }
            : i
        );
      } else {
        items = [...state.items, { product: action.product, quantity: action.quantity }];
      }
      break;
    }
    case "REMOVE_ITEM":
      items = state.items.filter((i) => i.product.id !== action.productId);
      break;
    case "UPDATE_QUANTITY":
      items = state.items
        .map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i
        )
        .filter((i) => i.quantity > 0);
      break;
    case "CLEAR_CART":
      items = [];
      break;
    case "LOAD_CART":
      items = action.items;
      break;
    default:
      return state;
  }

  const subtotal = items.reduce(
    (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity,
    0
  );
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, subtotal, total: subtotal, itemCount };
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  total: 0,
  itemCount: 0,
};

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zumomix-cart");
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        dispatch({ type: "LOAD_CART", items });
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("zumomix-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", product, quantity });
  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", productId });
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ ...state, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
