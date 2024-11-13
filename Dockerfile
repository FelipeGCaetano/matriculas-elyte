# Use a imagem oficial do Node.js como base
FROM node:18-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código para o contêiner
COPY . .

# Gere o schema do Prisma
RUN npx prisma generate  # Gera o Prisma Client

# A partir de uma nova imagem para evitar incluir devDependencies e otimizar a imagem final
FROM node:18-alpine AS runner

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas o necessário da fase de build para a imagem final
COPY --from=builder /app .

# Configura a variável de ambiente para produção
ENV NODE_ENV=production

# Expor a porta 3333, usada pelo seu aplicativo Node.js no modo de produção
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
