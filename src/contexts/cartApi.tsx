"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/auth";

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
  };
  quantity: number;
  itemTotal: number;
}

export interface Cart {
  cartId: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface CartContextProps {
  cart: Cart | null;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addProduct: (productId: string, quantity: number) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  decreaseQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  async function fetchCart() {
    if (!token) return;
    setLoading(true);
    try {
      const data = await api.get<Cart>("/cart", true);
      setCart(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Unauthorized") {
        // Desloga o usuário e limpa o carrinho
        useAuthStore.getState().logout();
        setCart(null);
        if (typeof window !== "undefined") {
          // Evita múltiplos toasts
          if (!window.__cartAuthToast) {
            window.__cartAuthToast = true;
            import("@/utils/toast").then(({ showError }) => {
              showError("Sessão expirada. Faça login novamente.");
              setTimeout(() => { window.__cartAuthToast = false; }, 3000);
            });
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(productId: string, quantity: number) {
    if (!token) return;
    setLoading(true);
    try {
      await api.post("/cart/add-product", { productId, quantity }, true);
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }

  async function removeProduct(productId: string) {
    if (!token) return;
    setLoading(true);
    try {
      await api.delete("/cart/remove-product", { productId }, true);
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }

  async function decreaseQuantity(productId: string, quantity: number) {
    if (!token) return;
    setLoading(true);
    try {
      await api.patch("/cart/decrease-quantity", { productId, quantity }, true);
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchCart();
    else setCart(null);
    // eslint-disable-next-line
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, loading, fetchCart, addProduct, removeProduct, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
