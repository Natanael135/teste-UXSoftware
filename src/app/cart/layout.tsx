import React from "react";
import { CartProvider } from "@/contexts/cartApi";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
