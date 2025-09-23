"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import Link from "next/link";
import { api } from "@/services/api";
import { showError } from "@/utils/toast";
import type { Product } from "@/types/product";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
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
    } catch (e: any) {
      showError(e.message || "Erro ao salvar produto");
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
        <input
          type="text"
          placeholder="Buscar por nome ou código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <Link href="/admin/products/create" className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90">Novo Produto</Link>
      </div>
      <table className="w-full border rounded bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Preço</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">Carregando...</td></tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-muted-foreground">Nenhum produto encontrado.</td>
            </tr>
          ) : filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">R$ {p.price}</td>
              <td className="p-2 flex gap-2">
                <button className="text-accent hover:underline" onClick={() => handleEditClick(p)}>Editar</button>
                <button className="text-red-600 hover:underline" onClick={async () => {
                  if (!confirm('Tem certeza que deseja excluir este produto?')) return;
                  try {
                    await api.delete(`/products/${p.id}`, undefined, true);
                    setProducts((prev) => prev.filter(prod => prod.id !== p.id));
                  } catch (e: any) {
                    showError(e.message || "Erro ao excluir produto");
                  }
                }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
