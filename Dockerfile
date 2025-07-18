# Etapa 1: Build da aplicação
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json tsconfig.json ./
COPY prisma ./prisma

# Instala dependências
RUN npm install

# Copia o código-fonte
COPY ./src ./src

# Build da aplicação
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:20-bullseye-slim

WORKDIR /app

# Instala openssl (libssl)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copia arquivos buildados e dependências da etapa builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copia o arquivo .env (ajuste conforme seu uso)
COPY .env .env

EXPOSE 3000

CMD ["node", "dist/index.js"]
