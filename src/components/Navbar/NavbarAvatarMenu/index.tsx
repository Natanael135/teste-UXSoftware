import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

import type { User } from "@/types/user";
interface NavbarAvatarMenuProps {
  user: User | null;
  logout: () => void;
}

export function NavbarAvatarMenu({ user, logout }: NavbarAvatarMenuProps) {
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer select-none focus:outline-none group">
          <Avatar className="border border-primary">
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
  );
}
