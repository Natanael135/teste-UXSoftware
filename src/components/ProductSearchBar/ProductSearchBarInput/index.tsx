import { Input } from "@/components/ui/input";

interface ProductSearchBarInputProps {
  search: string;
  setSearch: (v: string) => void;
}

export function ProductSearchBarInput({ search, setSearch }: ProductSearchBarInputProps) {
  return (
    <Input
      type="text"
      placeholder="Buscar produto por nome, marca, categoria..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="w-full shadow text-base px-4 py-2 border border-gray-300 focus:border-primary/70 bg-white dark:bg-gray-800 rounded-full transition-all duration-150"
      aria-label="Buscar produto"
      style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
    />
  );
}