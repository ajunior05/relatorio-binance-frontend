# Etapa de build
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos de configuração do React
COPY package*.json ./
COPY .env ./
RUN npm install

# Copia o restante do código
COPY . .

# Cria a build de produção
RUN npm run build

# Etapa de produção com nginx
FROM nginx:alpine

# Copia os arquivos gerados na etapa de build para o nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para o frontend
EXPOSE 80

# Comando padrão para rodar o nginx
CMD ["nginx", "-g", "daemon off;"]