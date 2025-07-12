FROM node:18-alpine
WORKDIR /app

# Instalar netcat para verificar conectividad
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install
COPY . .

# Hacer el script ejecutable
RUN chmod +x wait-for-mysql.sh

EXPOSE 3000

# Usar el script de espera
CMD ["./wait-for-mysql.sh"] 