import React from "react";
import Link from "next/link";
// Simplified desktop menu — props and extra icons/menus removed for now

export function NavbarDesktopMenu() {
  return (
    <div className="hidden md:flex items-center min-w-[120px]">
      <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary drop-shadow-sm hover:text-accent transition-colors">UX <span className="text-accent">Marketplace</span></Link>
    </div>
  );
}
