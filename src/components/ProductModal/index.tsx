"use client"

import React, { useState } from "react";
import { useProductForm } from "@/hooks/useProductForm";
import { api } from "@/services/api";
import { showError, showSuccess } from "@/utils/toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductModalHeader } from "./ProductModalHeader";
import { ProductModalForm } from "./ProductModalForm";
import { ProductModalFooter } from "./ProductModalFooter";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Record<string, unknown>;
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

  async function onSubmit(data: Record<string, unknown>) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", String(data.name));
      formData.append("price", String(data.price));
      formData.append("description", String(data.description || ""));
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }
      if (isEdit) {
        await api.put(`/products/${initialData.id}`, formData, true, true);
        showSuccess("Produto atualizado!");
      } else {
        await api.post("/products", formData, true, true);
        showSuccess("Produto criado!");
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (typeof err === "object" && err && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "message" in err.response.data) {
        showError((err.response.data as { message?: string }).message || "Erro ao salvar produto");
      } else {
        showError("Erro ao salvar produto");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <ProductModalHeader isEdit={isEdit} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ProductModalForm register={register} errors={errors} />
          <ProductModalFooter onClose={onClose} loading={loading} isEdit={isEdit} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
