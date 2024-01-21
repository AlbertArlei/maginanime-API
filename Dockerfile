#imagem base Node.js
FROM node:18.17.1

# Diretorio de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuraçao
COPY package*.json ./
COPY database ./
COPY api ./
COPY .env ./
COPY index.js ./

# Instalando dependencias
RUN npm install

#expondo a porta em que o aplicativo será executado
EXPOSE 8181

# comando para iniciar o aplicativo
CMD ["npm", "run", "dev"]