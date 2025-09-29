# UX Marketplace - Frontend

Uma aplicação web de e-commerce desenvolvida com Next.js, TypeScript e Tailwind CSS. Parte do desafio para Desenvolvedor Front-End na UX Software.

## Descrição

Esta é uma loja online completa com funcionalidades de autenticação, gerenciamento de produtos e carrinho de compras. O frontend consome uma API REST desenvolvida em NestJS.

### Funcionalidades Principais

- **Autenticação**: Login e cadastro de usuários com validações.
- **Produtos**: CRUD completo (Criar, Listar, Visualizar, Editar, Deletar).
- **Carrinho de Compras**: Adicionar produtos, gerenciar quantidades.
- **Interface Responsiva**: Design moderno e acessível.
- **Validações**: Formulários com máscaras e confirmações.

## Tecnologias Utilizadas

- **Framework**: Next.js 15
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Gerenciamento de Estado**: Zustand
- **Formulários**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notificações**: Sonner (toasts)
- **Ícones**: Lucide React
- **Outros**: Remask (máscaras)

## Requisitos Atendidos

Conforme desafio da UX Software:

1. **Geral**: 3+ páginas (Login, Cadastro, Produtos), produtos como home, tratamento de mensagens API
2. **Login**: Link para iniciar cadastro
3. **Cadastro**: Campos CPF, nome, email, telefone, senha; validação e confirmação; máscara CPF/telefone; alerta para CPF duplicado
4. **Produtos**: CRUD completo via interface admin
5. **Carrinho**: Adicionar produtos, fluxo básico

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- API backend rodando (ver <https://github.com/ux-software/marketplace-api>)

## Instalação e Execução

1. **Clone o repositorio**:

   ```bash
   git clone https://github.com/Natanael135/teste-UXSoftware.git
   ```

2. **Navegue ate o projeto**:

   ``` bash
   cd teste-UXSoftware
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Configure variáveis de ambiente**:
   Crie um arquivo `.env.local` na raiz:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

5. **Execute o projeto**:

   ```bash
   npm run dev
   ```

6. **Acesse**: `http://localhost:3000`

### Páginas e Funcionalidades

- `/` — **Home / Produtos**
  - Lista todos os produtos disponíveis.
  - Permite pesquisar, filtrar e acessar detalhes dos produtos.

- `/login` — **Login**
  - Permite ao usuário acessar sua conta.
  - Link para cadastro de novo usuário.

- `/register` — **Cadastro**
  - Formulário para criar uma nova conta.
  - Validação de CPF, telefone, e-mail e senha.

- `/cart` — **Carrinho**
  - Exibe os produtos adicionados ao carrinho.
  - Permite alterar quantidades, remover itens e finalizar a compra.

- `/admin/dashboard` — **Admin (Dashboard)**
  - Área restrita para administradores.
  - Permite criar, editar, excluir e visualizar produtos cadastrados.

- `/products/[id]` — **Detalhes do Produto**
  - Página individual de cada produto.
  - Mostra informações detalhadas, preço, estoque e opção de adicionar ao carrinho.

## Estrutura do Projeto

```bash
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── admin/dashboard/    # Dashboard admin (CRUD produtos)
│   ├── cart/               # Página do carrinho
│   ├── login/              # Página de login
│   ├── products/[id]/      # Detalhes do produto
│   ├── register/           # Cadastro de usuário
│   ├── layout.tsx          # Layout global
│   └── page.tsx            # Home (listagem produtos)
├── components/             # Componentes reutilizáveis
│   ├── AppImage.tsx        # Componente para imagens
│   ├── AuthLayout.tsx      # Layout para páginas de auth
│   ├── Cart/               # Componentes do carrinho
│   ├── Container.tsx       # Container responsivo
│   ├── footer/             # Componentes do footer
│   ├── LoadingSpinner.tsx  # Spinner de carregamento
│   ├── Navbar/             # Componentes da navbar
│   ├── Pagination/         # Componentes de paginação
│   ├── Product/            # Componentes de produto
│   ├── ProductCard/        # Card de produto
│   ├── ProductFilters/     # Filtros de produto
│   └── ui/                 # Componentes base (shadcn/ui)
├── contexts/               # Contextos React
├── hooks/                  # Hooks customizados
├── lib/                    # Utilitários
├── services/               # Configuração API
├── store/                  # Estado global (Zustand)
├── types/                  # Definições TypeScript
└── utils/                  # Funções auxiliares
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run lint` - Executa ESLint

## Credenciais de Teste

### Usuário Admin

- Email: ``
- Senha: ``

### Usuário Comum

- Email: ``
- Senha: ``

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é parte de um desafio técnico e não possui licença específica.

---
Desenvolvido para o desafio UX Software - Desenvolvedor Front-End 2025
