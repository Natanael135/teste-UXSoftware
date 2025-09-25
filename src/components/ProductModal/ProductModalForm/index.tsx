import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface ProductModalFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export function ProductModalForm({ register, errors }: ProductModalFormProps) {
  return (
    <>
      <div>
        <label className="block mb-1 text-foreground">Nome</label>
        <Input {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <span className="text-accent text-sm">{String(errors.name.message)}</span>}
      </div>
      <div>
        <label className="block mb-1 text-foreground">Preço</label>
        <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} aria-invalid={!!errors.price} />
        {errors.price && <span className="text-accent text-sm">{String(errors.price.message)}</span>}
      </div>
      <div>
        <label className="block mb-1 text-foreground">Imagem</label>
        <Input type="file" accept="image/*" {...register("image")} aria-invalid={!!errors.image} />
        {errors.image && <span className="text-accent text-sm">{String(errors.image.message)}</span>}
      </div>
      <div>
        <label className="block mb-1 text-foreground">Descrição</label>
        <textarea
          {...register("description")}
          className="resize-none min-h-[80px] input w-full bg-background text-foreground border border-input"
          aria-invalid={!!errors.description}
        />
        {errors.description && <span className="text-accent text-sm">{String(errors.description.message)}</span>}
      </div>
    </>
  );
}