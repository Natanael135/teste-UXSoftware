import React, { useState } from "react";
import { useProductForm } from "@/hooks/useProductForm";
import { api } from "@/services/api";
import { showError, showSuccess } from "@/utils/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useProductForm();

  React.useEffect(() => {
    if (open && initialData) {
      reset(initialData);
    } else if (open) {
      reset();
    }
  }, [open, initialData, reset]);

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/products/${initialData.id}`, data);
        showSuccess("Produto atualizado!");
      } else {
        await api.post("/products", data);
        showSuccess("Produto criado!");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      showError(err?.response?.data?.message || "Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-foreground">Nome</label>
            <Input {...register("name")} aria-invalid={!!errors.name} />
            {errors.name && <span className="text-accent text-sm">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block mb-1 text-foreground">Preço</label>
            <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} aria-invalid={!!errors.price} />
            {errors.price && <span className="text-accent text-sm">{errors.price.message}</span>}
          </div>
          <div>
            <label className="block mb-1 text-foreground">URL da Imagem</label>
            <Input {...register("image")} aria-invalid={!!errors.image} />
            {errors.image && <span className="text-accent text-sm">{errors.image.message}</span>}
          </div>
          <div>
            <label className="block mb-1 text-foreground">Descrição</label>
            <textarea
              {...register("description")}
              className="resize-none min-h-[80px] input w-full bg-background text-foreground border border-input"
              aria-invalid={!!errors.description}
            />
            {errors.description && <span className="text-accent text-sm">{errors.description.message}</span>}
          </div>
          <DialogFooter className="flex gap-2 mt-4">
            <Button type="button" variant="secondary" className="bg-secondary text-secondary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" disabled={loading}>
              {loading ? "Salvando..." : isEdit ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
