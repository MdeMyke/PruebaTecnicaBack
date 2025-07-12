#!/bin/sh

echo "Esperando a que MySQL esté disponible..."

# Esperar hasta que MySQL esté listo
while ! nc -z mysql 3306; do
  echo "MySQL no está disponible aún, esperando..."
  sleep 2
done

echo "MySQL está disponible, ejecutando migraciones..."

# Ejecutar migraciones y seeders
npm run db:setup

echo "Migraciones completadas, iniciando aplicación..."

# Iniciar la aplicación
npm start 