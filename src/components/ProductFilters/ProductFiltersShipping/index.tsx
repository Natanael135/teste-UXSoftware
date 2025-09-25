import { Checkbox } from "@/components/ui/checkbox";

interface ProductFiltersShippingProps {
  freeShipping: boolean;
  setFreeShipping: (v: boolean) => void;
}

export function ProductFiltersShipping({ freeShipping, setFreeShipping }: ProductFiltersShippingProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Frete grátis</label>
      <div className="flex items-center gap-2">
        <Checkbox
          id="freeShipping"
          checked={freeShipping}
          onCheckedChange={setFreeShipping}
        />
        <label htmlFor="freeShipping" className="text-xs cursor-pointer select-none text-foreground">
          Sim
        </label>
      </div>
    </div>
  );
}