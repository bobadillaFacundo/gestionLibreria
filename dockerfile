# Usa una imagen base de Node.js
FROM node:20.15.1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /
# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./



# Instala las dependencias

RUN npm install


# Copia el resto de la aplicación
COPY . .

# Expone el puerto 8000
EXPOSE 8000

# Variables de entorno para MongoDB
ENV MONGO_URL='mongodb://localhost:27017'
ENV MONGO_DB='coderhouse'
ENV MONGO_COLLECTION_CARRITOS='carritos'
ENV MONGO_COLLECTION_AUTORES='autores'
ENV MONGO_COLLECTION_CATEGORIAS='catgeorias'
ENV MONGO_COLLECTION_LIBROS = 'libros'
ENV MONGO_DB_URL='mongodb://localhost:27017/biblioteca'


# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]