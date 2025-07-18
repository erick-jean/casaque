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
```

# 💻 Executando o Projeto em docker
```bash
docker-compose up
```
# Recuperando backup do banco de dados
```bash
docker cp C:\Users\erick.prado\Desktop\projetos\casaque\meu_banco.sql casaque_postgres:/backup.sql
```
Depois, dentro do container:

```bash
docker exec -it casaque_postgres bash
psql -U postgres -d postgres < /backup.sql
```
