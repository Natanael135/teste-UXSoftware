import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersCategoryProps {
  category: string;
  setCategory: (v: string) => void;
  categories: string[];
}

export function ProductFiltersCategory({ category, setCategory, categories }: ProductFiltersCategoryProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Categoria</label>
      <Select value={category || "all"} onValueChange={(value) => setCategory(value === "all" ? "" : value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}