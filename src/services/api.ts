// Tipo auxiliar para erro mockado com response
type MockApiError = Error & { response?: { data?: { message?: string }, status?: number } };
// Produto em destaque mock
const featuredProducts = [
  {
    id: "1",
    name: "Notebook Gamer",
    price: 5999.99,
    image: "https://placehold.co/600x400",
    description: "Notebook potente para jogos e trabalho. Aproveite desempenho máximo com design moderno e bateria de longa duração.",
  },
  {
    id: "2",
    name: "Mouse Sem Fio",
    price: 199.9,
    image: "https://placehold.co/600x400",
    description: "Mouse ergonômico e preciso para produtividade e games.",
  },
  {
    id: "3",
    name: "Smartphone Pro Max",
    price: 3999.99,
    image: "https://placehold.co/600x400",
    description: "Celular topo de linha com câmera avançada e bateria de longa duração.",
  },
];
// MOCK de comentários por produto
const mockComments: Record<string, Array<{ id: string; user: string; rating: number; comment?: string }>> = {
  "1": [
    { id: "c1", user: "Ana", rating: 5, comment: "Ótimo notebook, superou minhas expectativas!" },
    { id: "c2", user: "Carlos", rating: 4, comment: "Bom desempenho, mas poderia ser mais leve." },
  ],
  "2": [
    { id: "c3", user: "João", rating: 5, comment: "Mouse muito confortável!" },
  ],
  "3": [
    { id: "c4", user: "Paula", rating: 4, comment: "Câmera excelente, bateria dura bem." },
  ],
  // ...outros produtos
};

// MOCK API para desenvolvimento local
const mockProducts = [
  {
    id: "1",
    name: "Notebook Gamer",
    price: 5999.99,
    image: "https://placehold.co/400x300",
    description: "Notebook potente para jogos e trabalho.",
    category: "Informática",
    brand: "Dell",
    rating: 4.8,
    freeShipping: true,
    color: "Preto",
    stock: 10,
  },
  {
    id: "2",
    name: "Mouse Sem Fio",
    price: 199.9,
    image: "https://placehold.co/400x300",
    description: "Mouse ergonômico e preciso.",
    category: "Acessórios",
    brand: "Logitech",
    rating: 4.6,
    freeShipping: false,
    color: "Cinza",
    stock: 30,
  },
  {
    id: "3",
    name: "Smartphone Pro Max",
    price: 3999.99,
    image: "https://placehold.co/400x300",
    description: "Celular topo de linha com câmera avançada.",
    category: "Celulares",
    brand: "Samsung",
    rating: 4.9,
    freeShipping: true,
    color: "Azul",
    stock: 15,
  },
  {
    id: "4",
    name: "Fone Bluetooth",
    price: 299.99,
    image: "https://placehold.co/400x300",
    description: "Fone de ouvido sem fio com cancelamento de ruído.",
    category: "Acessórios",
    brand: "Sony",
    rating: 4.7,
    freeShipping: true,
    color: "Branco",
    stock: 25,
  },
  {
    id: "5",
    name: "TV 4K Ultra HD",
    price: 2999.99,
    image: "https://placehold.co/400x300",
    description: "Smart TV com resolução 4K e HDR.",
    category: "TVs",
    brand: "LG",
    rating: 4.5,
    freeShipping: false,
    color: "Preto",
    stock: 8,
  },
  {
    id: "6",
    name: "Cafeteira Elétrica",
    price: 249.99,
    image: "https://placehold.co/400x300",
    description: "Cafeteira prática para o dia a dia.",
    category: "Eletrodomésticos",
    brand: "Philips",
    rating: 4.3,
    freeShipping: true,
    color: "Vermelho",
    stock: 20,
  },
];

export const api = {
  get: async (url: string) => {
    if (url === "/products") {
      return { data: mockProducts };
    }
    if (url === "/products/featured") {
      return { data: featuredProducts };
    }
    if (url.startsWith("/products/")) {
      const id = url.split("/").pop();
      const product = mockProducts.find((p) => p.id === id);
      const comments = mockComments[id!] || [];
      // Recomendações dinâmicas: complementares e da mesma categoria
      let recommendations: typeof mockProducts = [];
      if (product) {
        // Mapeamento de categorias complementares
        const complementares: Record<string, string[]> = {
          'Informática': ['Acessórios'],
          'Acessórios': ['Informática'],
          'Celulares': ['Acessórios'],
          'TVs': ['Acessórios', 'Eletrodomésticos'],
          'Eletrodomésticos': ['Acessórios'],
        };
        // Produtos da mesma categoria (exceto o atual)
        const mesmaCategoria = mockProducts.filter(
          (p) => p.category === product.category && p.id !== id
        );
        // Produtos de categorias complementares
        const categoriasComp = complementares[product.category || ''] || [];
        const complementaresProdutos = mockProducts.filter(
          (p) => categoriasComp.includes(p.category!) && p.id !== id
        );
        // Junta e remove duplicados
        recommendations = [...mesmaCategoria, ...complementaresProdutos].filter((v, i, arr) => arr.findIndex(p => p.id === v.id) === i);
      }
      return { data: { product, comments, recommendations } };
    }
    throw new Error("Endpoint não implementado no mock");
  },
  post: async (url: string, data: Record<string, unknown>) => {
    if (url === "/auth/login") {
      if (data.email === "admin@admin.com" && data.password === "123456") {
        // Mock de usuário autenticado
        return {
          data: {
            token: "mock-token",
            user: {
              name: "Administrador",
              email: "admin@admin.com",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg"
            }
          }
        };
      }
      const error: MockApiError = Object.assign(new Error("Credenciais inválidas"), {
        response: { data: { message: "Credenciais inválidas" }, status: 401 }
      });
      throw error;
    }
    if (url === "/users") {
      if (data.cpf === "000.000.000-00") {
        const error: MockApiError = Object.assign(new Error("CPF já cadastrado"), {
          response: { data: { message: "CPF já cadastrado" }, status: 409 }
        });
        throw error;
      }
      return { data: { ...data, id: String(Date.now()) } };
    }
    if (url === "/products") {
      // Garantir que todos os campos obrigatórios estejam presentes
      const requiredFields = ["name", "price", "image", "description", "category", "brand", "rating", "freeShipping", "color", "stock"];
      const isValid = requiredFields.every(f => f in data);
      if (isValid) {
        mockProducts.push({ ...(data as typeof mockProducts[number]), id: String(Date.now()) });
      } else {
        throw new Error("Dados de produto incompletos");
      }
      return { data };
    }
    throw new Error("Endpoint não implementado no mock");
  },
  put: async (url: string, data: Record<string, unknown>) => {
    if (url.startsWith("/products/")) {
      const id = url.split("/").pop();
      const idx = mockProducts.findIndex((p) => p.id === id);
      if (idx !== -1) mockProducts[idx] = { ...mockProducts[idx], ...data };
      return { data };
    }
    throw new Error("Endpoint não implementado no mock");
  },
  delete: async (url: string) => {
    if (url.startsWith("/products/")) {
      const id = url.split("/").pop();
      const idx = mockProducts.findIndex((p) => p.id === id);
      if (idx !== -1) mockProducts.splice(idx, 1);
      return { data: {} };
    }
    throw new Error("Endpoint não implementado no mock");
  },
};
