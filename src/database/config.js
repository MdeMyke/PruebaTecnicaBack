/**
 * Configuración de Sequelize para la base de datos
 * 
 * Este archivo es usado por Sequelize CLI para:
 * - Migraciones (crear/modificar tablas)
 * - Seeders (insertar datos de prueba)
 * - Comandos de gestión de BD
 * 
 * Las variables se leen desde el archivo .env para mantener
 * la seguridad y no exponer datos sensibles en el código.
 */
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log
  }
}; 