import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersSortProps {
  sort: string;
  setSort: (v: string) => void;
}

export function ProductFiltersSort({ sort, setSort }: ProductFiltersSortProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Ordenar por</label>
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Relevância" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevância</SelectItem>
          <SelectItem value="price-low">Menor preço</SelectItem>
          <SelectItem value="price-high">Maior preço</SelectItem>
          <SelectItem value="rating">Melhor avaliação</SelectItem>
          <SelectItem value="name">Nome (A-Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}