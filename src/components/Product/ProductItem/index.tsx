"use client";

import { AppImage } from "@/components/AppImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductItemProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductItem({ product, onEdit, onDelete }: ProductItemProps) {
  return (
    <div className="rounded-xl border border-border bg-white shadow-md p-4">
      <div className="flex flex-col gap-4 w-full">
        {/* Top row: image, name, actions */}
        <div className="flex flex-row gap-4 w-full">
          {/* Imagem */}
          <div className="flex-shrink-0">
            {(product.imageUrl || product.image) && (
              <AppImage
                src={product.imageUrl || product.image || ""}
                alt={product.name}
                width={70}
                height={70}
                className="rounded-lg bg-background border w-20 h-20 object-cover"
              />
            )}
          </div>
          {/* Nome e detalhes */}
          <div className="flex flex-col flex-1 min-w-0 gap-1">
            <div className="font-semibold text-foreground text-base leading-tight truncate max-w-full">
              {product.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {product.brand} - {product.category}
            </div>
            <div className="flex items-center gap-2">
              {product.freeShipping && <Badge variant="secondary">Frete Grátis</Badge>}
              <Badge variant="outline">Estoque: {product.stock}</Badge>
            </div>
          </div>
          {/* Ações */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Editar</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Deletar</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir o produto &quot;{product.name}&quot;? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {/* Bottom row: price and rating */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <span className="font-bold text-accent text-lg">R$ {product.price.toFixed(2)}</span>         
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}