
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Heart, ShoppingCart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import type { User } from "@/types/user";
interface NavbarMobileMenuProps {
  user: User | null;
  logout: () => void;
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
  handleCloseSheet: () => void;
  cartCount?: number;
}

export function NavbarMobileMenu({ user, logout, openSheet, setOpenSheet, handleCloseSheet, cartCount = 0 }: NavbarMobileMenuProps) {
  return (
    <div className="flex w-full items-center justify-between md:hidden">
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
  );
}
