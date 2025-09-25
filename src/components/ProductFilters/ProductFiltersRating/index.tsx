import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersRatingProps {
  minRating: string;
  setMinRating: (v: string) => void;
}

export function ProductFiltersRating({ minRating, setMinRating }: ProductFiltersRatingProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Avaliação</label>
      <Select value={minRating || "all"} onValueChange={(value) => setMinRating(value === "all" ? "" : value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="4.5">4.5+</SelectItem>
          <SelectItem value="4.0">4.0+</SelectItem>
          <SelectItem value="3.5">3.5+</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}