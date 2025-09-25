import { Input } from "@/components/ui/input";

interface ProductFiltersPriceMinProps {
  minPrice: string;
  setMinPrice: (v: string) => void;
}

export function ProductFiltersPriceMin({ minPrice, setMinPrice }: ProductFiltersPriceMinProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Preço mín.</label>
      <Input
        type="number"
        min={0}
        placeholder="0"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
      />
    </div>
  );
}