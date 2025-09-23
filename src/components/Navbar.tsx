"use client";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
// import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, ChevronDown, Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/contexts/cart";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { usePathname } from "next/navigation";
import { useSearchStore } from "@/store/search";

export const Navbar: React.FC = () => {
  const search = useSearchStore((s) => s.search);
  const setSearch = useSearchStore((s) => s.setSearch);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const pathname = usePathname();
  // Remove border-b se estiver na página de produtos
    const borderClass = pathname === "/products" ? "" : "border-b border-border";
    const cartItems = useCartStore((s) => s.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [openSheet, setOpenSheet] = React.useState(false);
  const handleCloseSheet = () => setOpenSheet(false);
  return (
    <>
      {/* Header principal responsivo */}
      <div className={`bg-background/90 shadow-sm ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          {/* Mobile: menu hambúrguer à esquerda, logo central, ícones à direita */}
          <div className="flex w-full items-center justify-between md:hidden">
            {/* Menu hambúrguer */}
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground hover:text-accent rounded" aria-label="Abrir menu">
                  <Menu className="w-7 h-7 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-6 w-64 bg-white">
                <nav className="flex flex-col gap-2 mt-8">
                  <Link href="/products" className="text-lg font-medium py-2 px-2 rounded text-black hover:bg-accent/10 hover:text-accent transition" onClick={handleCloseSheet}>Produtos</Link>
                  <Link href="/ofertas" className="text-lg font-medium py-2 px-2 rounded text-black hover:bg-accent/10 hover:text-accent transition" onClick={handleCloseSheet}>Ofertas</Link>
                  <Link href="/novidades" className="text-lg font-medium py-2 px-2 rounded text-black hover:bg-accent/10 hover:text-accent transition" onClick={handleCloseSheet}>Novidades</Link>
                  {/* Login/logout mobile */}
                  {!user && (
                    <Link href="/login" className="mt-4 flex items-center gap-2 text-lg font-medium py-2 px-2 rounded text-foreground hover:text-accent transition-colors border-t border-border pt-4" onClick={handleCloseSheet}>
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-foreground"><circle cx="12" cy="8" r="4" strokeWidth="1.5"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" strokeWidth="1.5"/></svg>
                      Entrar
                    </Link>
                  )}
                  {user && (
                    <div className="flex flex-col gap-2 mt-4 border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-black">{user.name}</span>
                      </div>
                      <button onClick={() => { logout(); handleCloseSheet(); }} className="text-base font-normal py-2 px-2 rounded text-red-600 hover:bg-accent/10 hover:text-red-700 transition text-left">Sair</button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            {/* Logo centralizada */}
            <Link href="/" className="text-xl font-extrabold tracking-tight text-primary drop-shadow-sm hover:text-accent transition-colors">UX <span className="text-accent">Marketplace</span></Link>
            {/* Ícones à direita */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-foreground hover:text-accent rounded" aria-label="Favoritos">
                <Heart className="w-6 h-6 text-foreground" fill="none" />
              </button>
              <Link href="/cart" className="relative flex items-center justify-center p-2 rounded-full hover:bg-accent/10 transition" tabIndex={0} aria-label="Carrinho">
                <ShoppingCart className="w-7 h-7 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white min-w-[20px] text-center select-none">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          {/* Desktop: logo à esquerda, busca central, ações à direita */}
          <div className="hidden md:flex items-center min-w-[120px]">
            <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary drop-shadow-sm hover:text-accent transition-colors">UX <span className="text-accent">Marketplace</span></Link>
          </div>
          <div className="hidden md:flex-1 md:flex md:justify-center">
            <form className="relative w-full max-w-2xl" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Buscar produto por nome, marca, categoria..."
                value={search}
                onChange={e => setSearch?.(e.target.value)}
                className="w-full shadow text-base px-5 py-2 border border-input focus:border-accent bg-white text-foreground rounded-full transition-all duration-150 pr-10 placeholder:text-muted-foreground"
                aria-label="Buscar produto"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors" tabIndex={-1} aria-label="Buscar">
                <Search className="size-5" />
              </button>
            </form>
          </div>
          <div className="hidden md:flex items-center gap-3 min-w-[180px] justify-end">
            {!user ? (
              <Link href="/login" className="flex items-center gap-2 text-base font-medium text-foreground hover:text-accent transition-colors">
                <span className="hidden sm:inline">Entrar</span>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-foreground"><circle cx="12" cy="8" r="4" strokeWidth="1.5"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" strokeWidth="1.5"/></svg>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 cursor-pointer select-none focus:outline-none group">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium max-w-[120px] truncate group-focus:underline group-hover:underline text-foreground">{user.name}</span>
                    <ChevronDown className="size-4 text-accent transition-transform group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={0} className="w-48 bg-background border border-border shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="text-foreground">Minha conta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="text-foreground">Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={logout} className="text-accent">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {/* Favoritos */}
            <Link href="#" className="flex items-center justify-center p-2 rounded-full hover:bg-accent/10 transition" tabIndex={0} aria-label="Favoritos">
              <Heart className="w-6 h-6 text-foreground" fill="none" />
            </Link>
            {/* Carrinho */}
            <Link href="/cart" className="relative flex items-center justify-center p-2 rounded-full hover:bg-accent/10 transition" tabIndex={0} aria-label="Carrinho">
              <ShoppingCart className="w-7 h-7 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white min-w-[20px] text-center select-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        {/* Barra de busca mobile */}
        <div className="md:hidden px-4 pb-2">
          <form className="relative w-full" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Buscar produto por nome, marca, categoria..."
              value={search}
              onChange={e => setSearch?.(e.target.value)}
              className="w-full shadow text-base px-5 py-2 border border-input focus:border-accent bg-white text-foreground rounded-full transition-all duration-150 pr-10 placeholder:text-muted-foreground"
              aria-label="Buscar produto"
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors" tabIndex={-1} aria-label="Buscar">
              <Search className="size-5" />
            </button>
          </form>
        </div>
      </div>
      {/* Subheader: menu de categorias (apenas desktop) */}
      <div className="hidden md:block bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2 overflow-x-auto">
          <button className="flex items-center gap-2 text-accent font-semibold text-base px-3 py-1 rounded hover:bg-accent/10 transition">
            <Menu className="w-5 h-5" />
            Departamentos
          </button>
          <Link href="/products" className="text-base font-medium text-foreground px-3 py-1 rounded hover:bg-accent/10 hover:text-accent transition">Produtos</Link>
          <Link href="/ofertas" className="text-base font-medium text-foreground px-3 py-1 rounded hover:bg-accent/10 hover:text-accent transition">Ofertas</Link>
          <Link href="/novidades" className="text-base font-medium text-foreground px-3 py-1 rounded hover:bg-accent/10 hover:text-accent transition">Novidades</Link>
          
        </div>
      </div>
    </>
  );
};
