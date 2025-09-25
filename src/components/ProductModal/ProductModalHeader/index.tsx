import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductModalHeaderProps {
  isEdit: boolean;
}

export function ProductModalHeader({ isEdit }: ProductModalHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{isEdit ? "Editar Produto" : "Novo Produto"}</DialogTitle>
    </DialogHeader>
  );
}