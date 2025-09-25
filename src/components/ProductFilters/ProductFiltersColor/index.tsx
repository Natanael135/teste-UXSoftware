import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersColorProps {
  color: string;
  setColor: (v: string) => void;
  colors: string[];
}

export function ProductFiltersColor({ color, setColor, colors }: ProductFiltersColorProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold text-foreground">Cor</label>
      <Select value={color || "all"} onValueChange={(value) => setColor(value === "all" ? "" : value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {colors.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}