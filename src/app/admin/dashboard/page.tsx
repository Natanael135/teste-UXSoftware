"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import Link from "next/link";
import { api } from "@/services/api";
import { showError } from "@/utils/toast";
import type { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    image: "",
    imageUrl: "",
    description: "",
    category: "",
    brand: "",
    rating: "",
    freeShipping: false,
    color: "",
    stock: "",
    imageFile: undefined as File | undefined, // para upload
    imagePreview: ""
  });
  const [saving, setSaving] = useState(false);
  // Quando abrir modal, preenche formulário
  useEffect(() => {
    if (editProduct) {
      setEditForm({
        name: editProduct.name || "",
        price: String(editProduct.price ?? ""),
        image: editProduct.image || "",
        imageUrl: editProduct.imageUrl || "",
        description: editProduct.description || "",
        category: editProduct.category || "",
        brand: editProduct.brand || "",
        rating: String(editProduct.rating ?? ""),
        freeShipping: !!editProduct.freeShipping,
        color: editProduct.color || "",
        stock: String(editProduct.stock ?? ""),
        imageFile: undefined,
        imagePreview: ""
      });
    }
  }, [editProduct]);
  function handleEditClick(product: Product) {
    setEditProduct(product);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (name === "imageFile" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm((f) => ({
          ...f,
          imageFile: file,
          image: reader.result as string, // base64
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setEditForm((f) => ({
        ...f,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  }

  async function handleEditSave() {
    setSaving(true);
    if (!editProduct) return;
    try {
      const updated = await api.put<Product>(`/products/${editProduct.id}`,
        {
          name: editForm.name,
          price: Number(editForm.price),
          image: editForm.image, // base64 ou url
          description: editForm.description,
          category: editForm.category,
          brand: editForm.brand,
          rating: editForm.rating ? Number(editForm.rating) : undefined,
          freeShipping: !!editForm.freeShipping,
          color: editForm.color,
          stock: editForm.stock ? Number(editForm.stock) : undefined
        },
        true // auth se necessário
      );
      setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
      setEditProduct(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        showError(e.message || "Erro ao salvar produto");
      } else {
        showError("Erro ao salvar produto");
      }
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    api.get<{ products: Product[] }>("/products")
      .then((res) => {
        const data = Array.isArray(res.products) ? res.products : [];
        setProducts(data);
      })
      .catch(() => { setProducts([]); showError("Erro ao carregar produtos"); })
      .finally(() => setLoading(false));
  }, []);

  // Filtro por nome ou id
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard do Administrador</h1>
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="Buscar por nome ou código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href="/admin/products/create" className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90">Novo Produto</Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">Carregando...</TableCell>
            </TableRow>
          ) : filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">Nenhum produto encontrado.</TableCell>
            </TableRow>
          ) : filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>R$ {p.price}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditClick(p)}>Editar</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">Excluir</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir o produto &quot;{p.name}&quot;? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={async () => {
                        try {
                          await api.delete(`/products/${p.id}`, undefined, true);
                          setProducts((prev) => prev.filter(prod => prod.id !== p.id));
                        } catch (e: unknown) {
                          if (e instanceof Error) {
                            showError(e.message || "Erro ao excluir produto");
                          } else {
                            showError("Erro ao excluir produto");
                          }
                        }
                      }}>Excluir</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal de edição */}
      <Dialog open={!!editProduct} onOpenChange={open => !open && setEditProduct(null)}>
        <DialogContent className="max-w-lg w-full p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>Altere os campos desejados e salve para atualizar o produto.</DialogDescription>
          </DialogHeader>
          <form onSubmit={e => { e.preventDefault(); handleEditSave(); }} className="flex flex-col gap-3 px-6 pb-2 pt-2 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                Nome
                <input name="name" value={editForm.name} onChange={handleEditChange} className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col gap-1">
                Preço
                <input name="price" type="number" value={editForm.price} onChange={handleEditChange} className="border rounded px-3 py-2" required min={0} step={0.01} />
              </label>
              <label className="flex flex-col gap-1">
                Imagem
                <input name="imageFile" type="file" accept="image/*" onChange={handleEditChange} className="border rounded px-3 py-2" />
                {editForm.imagePreview || editForm.image ? (
                  <Image
                    src={(editForm.imagePreview || editForm.imageUrl || editForm.image) ?? ""}
                    alt="Preview"
                    width={220}
                    height={128}
                    className="mt-2 rounded shadow max-h-32 object-contain border"
                  />
                ) : null}
              </label>
              <label className="flex flex-col gap-1">
                Categoria
                <input name="category" value={editForm.category} onChange={handleEditChange} className="border rounded px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1">
                Marca
                <input name="brand" value={editForm.brand} onChange={handleEditChange} className="border rounded px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1">
                Cor
                <input name="color" value={editForm.color} onChange={handleEditChange} className="border rounded px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1">
                Estoque
                <input name="stock" type="number" value={editForm.stock} onChange={handleEditChange} className="border rounded px-3 py-2" min={0} />
              </label>
              <label className="flex flex-col gap-1">
                Avaliação (rating)
                <input name="rating" type="number" step="0.1" value={editForm.rating} onChange={handleEditChange} className="border rounded px-3 py-2" min={0} max={5} />
              </label>
            </div>
            <label className="flex flex-col gap-1">
              Descrição
              <textarea name="description" value={editForm.description} onChange={handleEditChange} className="border rounded px-3 py-2 min-h-[60px]" />
            </label>
            <label className="flex flex-row gap-2 items-center">
              <input name="freeShipping" type="checkbox" checked={!!editForm.freeShipping} onChange={handleEditChange} />
              Frete grátis
            </label>
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 rounded border">Cancelar</button>
              </DialogClose>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
