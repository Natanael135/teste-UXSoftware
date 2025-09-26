import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export function NavbarSubheader() {
  return (
    <div className="hidden md:block bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2 overflow-x-auto">
        <button className="flex items-center gap-2 text-accent font-semibold text-base px-3 py-1 rounded hover:bg-accent/10 transition">
          <Menu className="w-5 h-5" />
          Departamentos
        </button>
  <Link href="/" className="text-base font-medium text-foreground px-3 py-1 rounded hover:bg-accent/10 hover:text-accent transition">Produtos</Link>
        <Link href="/ofertas" className="text-base font-medium text-foreground px-3 py-1 rounded hover:bg-accent/10 hover:text-accent transition">Ofertas</Link>
        <Link href="/novidades" className="text-base font-medium text-foreground px-3 py-1 rounded hover:bg-accent/10 hover:text-accent transition">Novidades</Link>
      </div>
    </div>
  );
}
