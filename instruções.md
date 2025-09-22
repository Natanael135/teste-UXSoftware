Crie um projeto Next.js com TypeScript e estilização usando TailwindCSS. O projeto deve ser limpo, moderno, responsivo e escalável, seguindo boas práticas de arquitetura e organização de código.

Estrutura do Projeto

Padrão Clean Architecture no front-end (separação clara entre componentes, páginas, hooks, services e contextos).

Utilizar ESLint + Prettier configurados.

Criar um layout base (Navbar, Footer, Container responsivo) para ser reutilizado nas páginas.

Configurar .env.local para variáveis de ambiente (ex: API_URL).

Criar README.md detalhado com passo a passo de execução e deploy.

Funcionalidades Obrigatórias

Autenticação

Página de Login (/login)

Campos: email e senha.

Botão de acesso e link para cadastro.

Integração com API: POST /auth/login.

Exibir mensagens de erro vindas da API.

Página de Cadastro de Usuário (/register)

Campos: CPF (com máscara 000.000.000-00), Nome Completo, E-mail, Telefone (máscara (00) 00000-0000), Senha e Confirmar Senha.

Validação de senha e confirmação.

Tratamento de erro caso o CPF já exista (409 Conflict).

Integração com API: POST /users.

Produtos (Home)

Página / exibindo a listagem de produtos (integração GET /products).

Criar CRUD completo de produtos (Create, Read, Update, Delete) com modais ou páginas dedicadas:

Criar produto (POST /products)

Atualizar produto (PUT /products/:id)

Deletar produto (DELETE /products/:id)

Feedback visual (toasts/notificações) para cada operação.

Uso de componentes reutilizáveis para cards de produto.

Carrinho de Compras

Permitir adicionar produtos ao carrinho.

Exibir carrinho lateral ou página /cart.

Opções para alterar quantidade e remover itens.

Calcular subtotal e total.

Requisitos Técnicos

Next.js 14 (App Router) ou versão estável mais recente.

TailwindCSS com design clean, minimalista e moderno.

React Hook Form + Zod para formulários e validação.

Axios para requisições HTTP (com interceptors).

React Context ou Zustand para estado global (auth e carrinho).

React Hot Toast ou equivalente para mensagens visuais.

Deploy em Vercel.

Extra (profissionalismo e escalabilidade)

Componentes acessíveis (ARIA roles, Keyboard Navigation).

Dark/Light Mode.

Testes unitários com Jest + React Testing Library.

Configuração CI/CD (GitHub Actions com lint + test).