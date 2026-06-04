# 📚 Flora Biblioteca

**Flora Biblioteca** é um sistema moderno de gestão e leitura de livros digitais. Foi desenvolvido para proporcionar uma experiência limpa, dinâmica e imersiva aos leitores, ao mesmo tempo que oferece aos administradores ferramentas robustas para a gestão do catálogo literário.

## ✨ Funcionalidades Principais

* **Catálogo Digital:** Navegação fluida por vários livros, organizados por categorias (Ficção, Romance, Terror, etc.).
* **Sistema de Autenticação:** Registo e Login seguros utilizando JSON Web Tokens (JWT).
* **Painel de Administração (Admin):** Interface dedicada para adicionar, editar e apagar livros. Suporta o upload simultâneo da **Capa** (imagem) e do **Livro** (ficheiro PDF).
* **Leitor de PDF Integrado:** Os utilizadores podem ler os livros diretamente na plataforma.
* **Histórico de Leitura:** O sistema regista automaticamente os livros que o utilizador começou a ler e exibe-os no seu perfil.
* **Sistema de Comentários:** Os leitores podem deixar opiniões e avaliações nos livros do catálogo.
* **Gestão de Perfil:** Alteração de senha protegida e visualização de estatísticas.

---

## 🛠️ Tecnologias Utilizadas

O projeto está dividido numa arquitetura _Client-Server_ (Frontend e Backend):

**Frontend (Interface do Utilizador)**
* **React.js** (com Vite para *build* e *dev server* ultra-rápido)
* **Tailwind CSS v3** (Estilização responsiva e UI moderna com tons rosa/cinza)
* **React Router Dom** (Navegação entre páginas)

**Backend (Servidor e API)**
* **Node.js** & **Express.js** (Criação da API RESTful)
* **MongoDB** & **Mongoose** (Base de dados NoSQL)
* **Multer** (Gestão de uploads de imagens e PDFs)
* **JSON Web Token (JWT)** & **Bcrypt.js** (Segurança e Autenticação)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de que tem o [Node.js](https://nodejs.org/) instalado na sua máquina.

### 1. Configurar e Iniciar o Backend
Abra um terminal na pasta do projeto e execute:
```bash
cd backend
npm install
npm run dev
```
*(O servidor irá iniciar na porta `5000`)*

**Nota sobre a Base de Dados:** O backend está configurado para ligar-se a um cluster do MongoDB Atlas através de uma variável `MONGO_URI` no ficheiro `.env`.

### 2. Configurar e Iniciar o Frontend
Abra um **segundo terminal** na pasta do projeto e execute:
```bash
cd frontend
npm install
npm run dev
```
*(O site ficará disponível em `http://localhost:5173`)*

---

## 🔐 Acesso Especial de Administrador

Para testar as funcionalidades de gestão do acervo (fazer upload de livros e apagar comentários), utilize a seguinte credencial de back-door configurada no ecrã de Login:

* **Utilizador:** *(deixe este campo completamente em branco)*
* **Senha:** `ADMIN123`

Ao entrar, será redirecionado automaticamente para o **Painel Administrativo**.

---

## 📁 Estrutura do Projeto

```text
Flora-Biblioteca-2/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Lógica de negócio (auth, books, users, comments)
│   │   ├── middleware/    # Proteção de rotas (JWT, Admin)
│   │   ├── models/        # Schemas do MongoDB (User, Book, Comment)
│   │   ├── routes/        # Endpoints da API REST
│   │   └── uploads/       # Ficheiros físicos (Capas e PDFs carregados)
│   ├── .env               # Variáveis de ambiente
│   └── package.json       # Dependências do backend
│
└── frontend/
    ├── src/
    │   ├── components/    # Componentes reutilizáveis (ex: Navbar, ProtectedRoute)
    │   ├── pages/         # Ecrãs principais (Login, Dashboard, Catalog, etc.)
    │   ├── index.css      # Configuração central do Tailwind CSS
    │   └── main.jsx       # Ponto de entrada do React
    ├── tailwind.config.js # Regras de design e cores do Tailwind
    └── package.json       # Dependências do frontend
```
