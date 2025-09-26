"use client";
import React, { useState, useEffect } from "react";
import { api } from "@/services/api";
import { showError, showSuccess } from "@/utils/toast";
import type { Product } from "@/types/product";
import { FormInput } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, Package } from "lucide-react";
import { useProductForm } from "@/hooks/useProductForm";
import { ProductFormData } from "@/hooks/useProductSchema";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductList } from "@/components/Product";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const form = useProductForm();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get<{ products: Product[] }>("/products");
      setProducts(Array.isArray(res.products) ? res.products : []);
    } catch {
      showError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setImageFile(null);
    form.reset({
      name: "",
      price: 0,
      image: "",
      description: "",
      category: "",
      brand: "",
      rating: undefined,
      freeShipping: false,
      color: "",
      stock: undefined,
    });
    setDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      price: product.price,
      image: product.image || product.imageUrl || "",
      description: product.description || "",
      category: product.category || "",
      brand: product.brand || "",
      rating: product.rating,
      freeShipping: product.freeShipping || false,
      color: product.color || "",
      stock: product.stock,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`, undefined, true);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      showSuccess("Produto excluído com sucesso");
    } catch {
      showError("Erro ao excluir produto");
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingProduct) {
        const updated = await api.put<Product>(`/products/${editingProduct.id}`, formData, true, true);
        setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
        showSuccess("Produto atualizado com sucesso");
      } else {
        const created = await api.post<Product>("/products", formData, true, true);
        setProducts((prev) => [created, ...prev]);
        showSuccess("Produto criado com sucesso");
      }
      setDialogOpen(false);
      setImageFile(null);
    } catch {
      showError("Erro ao salvar produto");
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            Dashboard do Administrador
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="relative w-full sm:flex-1">
              <FormInput
                placeholder="Buscar produtos..."
                value={search}
                onChange={setSearch}
                prefix={<Search className="h-4 w-4" />}
                containerClassName="relative"
              />
            </div>
            <Button onClick={handleCreate} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </div>

          <ProductList
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={(product) => handleDelete(product.id)}
          />

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum produto encontrado.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto mx-auto rounded-xl p-4 shadow-lg border border-border flex flex-col">
          <DialogTitle className="text-lg font-bold text-center text-foreground mb-4">
            {editingProduct ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingProduct ? "Atualize as informações do produto." : "Preencha as informações do novo produto."}
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="blocked-cursor">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <FormInput {...field} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <FormInput
                          type="number"
                          step="0.01"
                          value={field.value}
                          onChange={(value) => field.onChange(parseFloat(value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <FormInput
                        type="file"
                        accept="image/*"
                        onChange={(value) => {
                          // Para file inputs, o valor vem do evento, mas FormInput espera string
                          // Vamos manter o comportamento original por enquanto
                        }}
                        {...field}
                        value={undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="blocked-cursor">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="blocked-cursor">
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <FormInput
                          value={field.value}
                          onChange={field.onChange}
                          disabled
                          title="Campo desabilitado"
                          className="blocked-cursor opacity-60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="blocked-cursor">
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <FormInput
                          {...field}
                          onChange={field.onChange}
                          disabled
                          title="Campo desabilitado"
                          className="blocked-cursor opacity-60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="blocked-cursor">
                      <FormLabel>Avaliação</FormLabel>
                      <FormControl>
                        <FormInput
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={field.value}
                          onChange={field.onChange}
                          disabled
                          title="Campo desabilitado"
                          className="blocked-cursor opacity-60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="blocked-cursor">
                      <FormLabel>Estoque</FormLabel>
                      <FormControl>
                        <FormInput
                          type="number"
                          min="0"
                          value={field.value}
                          onChange={field.onChange}
                          disabled
                          title="Campo desabilitado"
                          className="blocked-cursor opacity-60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="blocked-cursor">
                      <FormLabel>Cor</FormLabel>
                      <FormControl>
                        <FormInput
                          value={field.value}
                          onChange={field.onChange}
                          disabled
                          title="Campo desabilitado"
                          className="blocked-cursor opacity-60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="freeShipping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 blocked-cursor">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled
                        title="Campo desabilitado"
                        className="blocked-cursor opacity-60"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Frete Grátis</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Salvando..." : editingProduct ? "Atualizar" : "Criar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
