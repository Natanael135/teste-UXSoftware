import { FormInput } from "@/components/ui/form-input";

interface ProductFiltersPriceMinProps {
  minPrice: string;
  setMinPrice: (v: string) => void;
}

export function ProductFiltersPriceMin({ minPrice, setMinPrice }: ProductFiltersPriceMinProps) {
  return (
    <FormInput
      label="Preço mín."
      type="number"
      min={0}
      placeholder="0"
      value={minPrice}
      onChange={setMinPrice}
    />
  );
}