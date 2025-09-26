import { FormInput } from "@/components/ui/form-input";

interface ProductFiltersPriceMaxProps {
  maxPrice: string;
  setMaxPrice: (v: string) => void;
}

export function ProductFiltersPriceMax({ maxPrice, setMaxPrice }: ProductFiltersPriceMaxProps) {
  return (
    <FormInput
      label="Preço máx."
      type="number"
      min={0}
      placeholder="∞"
      value={maxPrice}
      onChange={setMaxPrice}
    />
  );
}