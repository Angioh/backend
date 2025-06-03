# Imagen base
FROM node:18-alpine

# Crear y usar el directorio de trabajo
WORKDIR /app

# Copiar dependencias y archivo lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Compilar el proyecto
RUN npm run build

# Exponer el puerto por defecto de NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
