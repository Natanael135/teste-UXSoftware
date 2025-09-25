import { Input } from "@/components/ui/input";

interface ProductFiltersPriceMaxProps {
  maxPrice: string;
  setMaxPrice: (v: string) => void;
}

export function ProductFiltersPriceMax({ maxPrice, setMaxPrice }: ProductFiltersPriceMaxProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Preço máx.</label>
      <Input
        type="number"
        min={0}
        placeholder="∞"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
      />
    </div>
  );
}