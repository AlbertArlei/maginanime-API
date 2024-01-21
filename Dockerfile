#imagem base Node.js
FROM node:18.17.1

# Diretorio de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuraçao
COPY package*.json ./

# Instalando dependencias
RUN npm install


# Copiar o restante do código-fonte
COPY . .

#expondo a porta em que o aplicativo será executado
EXPOSE 8181

# Restaurar o banco de dados a partir do arquivo de backup
RUN apt-get update && apt-get install -y postgresql-client

# Adicione as configurações especificas do seu banco de dados (host, user, senha, etc.)
ENV PGHOST=127.0.0.1
ENV PGPORT=5432
ENV PGUSER=postgres
ENV PGPASSWORD=your-password
ENV PGDATABASE=maginanime

# Copie o  arquivo de backup para o container
COPY maginanime.backup.dump /usr/src/app/

# Restaurar o banco de dados
RUN pg_restore --host=$PGHOST --PORT=$PGPORT --username=$PGUSER --password=$PGPASSWORD --dbname=$PGDATABASE --verbose /usr/src/app/maginanime.backup


# comando para iniciar o aplicativo
CMD ["npm", "run", "dev"]