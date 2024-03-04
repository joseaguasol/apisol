# Utiliza una imagen base de Node.js con la versión que necesitas
FROM node:18.18.0

# Crea y establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (si existen)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Instala Nginx
RUN apt-get update && apt-get install -y nginx

# Copia el archivo de configuración de Nginx
COPY nginx/default.conf /etc/nginx/sites-available/default

# Crea el enlace simbólico para activar la configuración
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Expone los puertos de la aplicación y Nginx
EXPOSE 3000 80

# Comando para ejecutar la aplicación y Nginx
CMD ["sh", "-c", "node index.mjs & nginx -g 'daemon off;'"]
