import React from "react";
import { Search } from "lucide-react";

interface NavbarSearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

export function NavbarSearchBar({ search, setSearch }: NavbarSearchBarProps) {
  return (
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
  );
}
