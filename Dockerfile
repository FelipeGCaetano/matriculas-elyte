# Baseada na imagem oficial do PostgreSQL
FROM postgres:latest

# Variáveis de ambiente para inicialização do banco de dados
ENV POSTGRES_USER=elyte
ENV POSTGRES_PASSWORD=elyte
ENV POSTGRES_DB=matriculas

# Copiar scripts de inicialização (se houver) para o contêiner
# Eles serão executados automaticamente quando o PostgreSQL iniciar
COPY ./initdb.sql /docker-entrypoint-initdb.d/

# Expor a porta 5432 do contêiner
EXPOSE 5432

# Use a imagem oficial do Node.js como base
FROM node:18-alpine AS builder

# Instale as dependências
RUN npm install -y

# A partir de uma nova imagem para evitar incluir devDependencies e otimizar a imagem final
FROM node:18-alpine AS runner

# Configura a variável de ambiente para produção
ENV NODE_ENV=production

# Expor a porta 3000, usada pelo Next.js no modo de produção
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
