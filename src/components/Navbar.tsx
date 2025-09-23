"use client";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, ChevronDown, Search } from "lucide-react";
import { useAuthStore } from "@/store/auth";
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
  return (
    <nav className={`bg-primary/90 backdrop-blur-md ${borderClass} shadow-sm`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-4">
        {/* Mobile: menu left, logo right; Desktop: logo left, menu right */}
        {/* Botão menu mobile à esquerda */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu" className="ml-0">
                <Menu className="size-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6 w-72">
              <nav className="flex flex-col gap-2 mt-8">
                <Link href="/products" className="text-lg font-medium py-2 px-2 rounded text-primary-foreground hover:bg-accent hover:text-accent-foreground transition" tabIndex={0}>Produtos</Link>
                <Link href="/cart" className="text-lg font-medium py-2 px-2 rounded text-primary-foreground hover:bg-accent hover:text-accent-foreground transition" tabIndex={0}>Carrinho</Link>
                {user ? (
                  <div className="flex items-center gap-2 mt-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                ) : (
                  <Link href="/login" className="text-lg font-medium py-2 px-2 rounded text-primary-foreground hover:bg-accent hover:text-accent-foreground transition" tabIndex={0}>Entrar</Link>
                )}
                <hr className="my-4 border-border" />
                {/* <div className="pt-2"><ThemeToggle /></div> */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Logo à esquerda */}
        <div className="flex-1 flex justify-end md:justify-start min-w-[120px]">
          <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary-foreground drop-shadow-sm hover:text-accent transition-colors">UX <span className="text-accent">Marketplace</span></Link>
        </div>

        {/* Barra de busca centralizada, integrada ao header, estilo Magalu */}
  {pathname === "/products" ? (
          <div className="flex-1 flex justify-center">
            <form className="relative w-full max-w-2xl" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Buscar produto por nome, marca, categoria..."
                value={search}
                onChange={e => setSearch?.(e.target.value)}
                className="w-full shadow text-base px-5 py-2 border border-input focus:border-accent bg-background text-foreground rounded-full transition-all duration-150 pr-10 placeholder:text-muted-foreground"
                aria-label="Buscar produto"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors" tabIndex={-1} aria-label="Buscar">
                <Search className="size-5" />
              </button>
            </form>
          </div>
        ) : null}
        

        {/* Desktop menu */}
        <div className="hidden md:flex gap-2 items-center min-w-[220px] justify-end">
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-accent hover:text-accent-foreground">
            <Link href="/products">Produtos</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-accent hover:text-accent-foreground">
            <Link href="/cart">Carrinho</Link>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer select-none focus:outline-none group">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium max-w-[120px] truncate group-focus:underline group-hover:underline text-primary-foreground">{user.name}</span>
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
          ) : (
            <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/login">Entrar</Link>
            </Button>
          )}
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
};
