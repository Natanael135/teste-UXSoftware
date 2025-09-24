"use client";
import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useCart } from "@/contexts/cartApi";
import { usePathname } from "next/navigation";
import { useSearchStore } from "@/store/search";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarDesktopMenu } from "./NavbarDesktopMenu";
import { NavbarAvatarMenu } from "./NavbarAvatarMenu";
import { NavbarSearchBar } from "./NavbarSearchBar";
import { NavbarSubheader } from "./NavbarSubheader";

export function Navbar() {
  const search = useSearchStore((s) => s.search);
  const setSearch = useSearchStore((s) => s.setSearch);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const pathname = usePathname();
  const borderClass = pathname === "/products" ? "" : "border-b border-border";
  const { cart } = useCart();
  const cartItems = cart?.items || [];
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [openSheet, setOpenSheet] = React.useState(false);
  const handleCloseSheet = () => setOpenSheet(false);

  return (
    <>
      <div className={`bg-background/90 shadow-sm ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <NavbarMobileMenu user={user} logout={logout} openSheet={openSheet} setOpenSheet={setOpenSheet} handleCloseSheet={handleCloseSheet} cartCount={cartCount} />
          {/* Logo à esquerda (desktop) */}
          <NavbarDesktopMenu />
          {/* Campo de busca centralizado (desktop) */}
          <div className="hidden md:flex-1 md:flex md:justify-center">
            <NavbarSearchBar search={search} setSearch={setSearch} />
          </div>
          {/* Ícones à direita (desktop) */}
          <div className="hidden md:flex items-center gap-3 min-w-[180px] justify-end">
            {/* Usuário */}
            {!user ? (
              <a href="/login" className="flex items-center gap-2 text-base font-medium text-foreground hover:text-accent transition-colors">
                <span className="hidden sm:inline">Entrar</span>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-foreground"><circle cx="12" cy="8" r="4" strokeWidth="1.5"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" strokeWidth="1.5"/></svg>
              </a>
            ) : (
              <NavbarAvatarMenu user={user} logout={logout} />
            )}
            {/* Favoritos */}
            <a href="#" className="flex items-center justify-center p-2 rounded-full hover:bg-accent/10 transition" tabIndex={0} aria-label="Favoritos">
              <Heart className="w-6 h-6 text-foreground" />
            </a>
            {/* Carrinho */}
            <a href="/cart" className="relative flex items-center justify-center p-2 rounded-full hover:bg-accent/10 transition" tabIndex={0} aria-label="Carrinho">
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white min-w-[20px] text-center select-none">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
        <div className="md:hidden px-4 pb-2">
          <NavbarSearchBar search={search} setSearch={setSearch} />
        </div>
      </div>
      <NavbarSubheader />
    </>
  );
}
