import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersBrandProps {
  brand: string;
  setBrand: (v: string) => void;
  brands: string[];
}

export function ProductFiltersBrand({ brand, setBrand, brands }: ProductFiltersBrandProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Marca</label>
      <Select value={brand || "all"} onValueChange={(value) => setBrand(value === "all" ? "" : value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {brands.map((b) => (
            <SelectItem key={b} value={b}>{b}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}