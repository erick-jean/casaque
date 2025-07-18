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

# 🐳 Executando com Docker
Para subir toda a aplicação e o banco PostgreSQL usando Docker Compose:
```bash
docker-compose up -d
```
# 🗂️ Restaurando Backup do Banco de Dados
Se desejar restaurar um backup .sql no container do PostgreSQL, siga os passos:
## 1.Copie o arquivo de backup para o container:
```bash
docker cp caminho/para/seu/backup.sql casaque_postgres:/backup.sql
```
## 2.Acesse o container:
```bash
docker exec -it casaque_postgres bash
```
## 3.Execute o comando para restaurar o banco:
```bash
psql -U postgres -d postgres < /backup.sql
```

# 📖 Documentação da API
A API possui documentação interativa via Swagger, acessível em:

```bash
http://localhost:3000/api-docs

```
# 🛡️ Segurança

Utilizamos Helmet para proteger as respostas HTTP.
Configuração CORS para controlar acessos externos.
Validação rigorosa de dados com Zod.
Autenticação via JWT para rotas protegidas.
