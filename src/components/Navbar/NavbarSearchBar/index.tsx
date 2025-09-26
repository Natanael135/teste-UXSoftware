import React from "react";
import { FormInput } from "@/components/ui/form-input";
import { Search } from "lucide-react";

interface NavbarSearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

export function NavbarSearchBar({ search, setSearch }: NavbarSearchBarProps) {
  return (
    <form className="relative w-full max-w-2xl" onSubmit={e => e.preventDefault()}>
      <FormInput
        type="text"
        placeholder="Buscar produto por nome, marca, categoria..."
        value={search}
        onChange={setSearch}
        containerClassName="relative"
        className="text-base px-5 py-2 border border-input focus:border-accent bg-white text-foreground rounded-full transition-all duration-150 pr-12 placeholder:text-muted-foreground"
    
        aria-label="Buscar produto"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors" tabIndex={-1} aria-label="Buscar">
        <Search className="size-5" />
      </button>
    </form>
  );
}
