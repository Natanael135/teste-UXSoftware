import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import type { User } from "@/types/user";
interface NavbarDesktopMenuProps {
  user: User;
  logout: () => void;
  cartCount: number;
}

export function NavbarDesktopMenu() {
  return (
    <div className="hidden md:flex items-center min-w-[120px]">
      <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary drop-shadow-sm hover:text-accent transition-colors">UX <span className="text-accent">Marketplace</span></Link>
    </div>
  );
}
