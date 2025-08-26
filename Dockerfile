# Etapa 1: build
FROM node:20-alpine AS build

WORKDIR /src

# Copia package.json + yarn.lock
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install

# Copia o resto do projeto
COPY . .

# Gera o build (vai criar /src/dist)
RUN yarn build

# Etapa 2: servidor Nginx
FROM nginx:alpine

# Copia o build da primeira etapa
COPY --from=build /src/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
