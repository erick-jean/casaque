# 🚀 Casaque API

API backend do projeto Casaque, construída em Node.js com TypeScript, Express e Prisma ORM para gerenciar funcionalidades relacionadas a usuários, imóveis e corretores. A API conta com autenticação JWT, documentação Swagger e foco em segurança.

## 🧰 Tecnologias Utilizadas 

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- Zod (Validação)
- Swagger (Documentação)
- Helmet (Segurança)
- CORS (Cross-Origin Resource Sharing)
- Dotenv (Variáveis de ambiente)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/erick-jean/casaque.git
cd casaque

# Instale as dependências
npm install

```

# 💻 Executando o Projeto
## Modo Desenvolvimento
```bash
npm run dev
```
## Modo Desenvolvimento
```bash
npm run build
npm start
```

## 🔧 Configurações

Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto com as seguintes variáveis (ajuste conforme seu ambiente):
```bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nomedobanco
JWT_SECRET=sua_chave_secreta
PORT=3000
```
