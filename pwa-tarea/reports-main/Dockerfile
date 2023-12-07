#Descargar e instalar node 20 en el contenedor
FROM node:20 as builder
#Ambiente de trabajo
WORKDIR /app
#Copiamos archivos de nuestro proyecto al contendor
COPY package*.json ./
#Instalamos dependencias
RUN npm install
COPY . .
RUN npx tsc
EXPOSE 3000
CMD ["node", "dist/index.js"]