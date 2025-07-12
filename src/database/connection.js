const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la base de datos desde variables de entorno
const config = {
  database: process.env.DB_NAME || 'prueba_tecnica',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql', // mysql, postgres, sqlite, mariadb, mssql
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5, // Máximo número de conexiones en el pool
    min: 0, // Mínimo número de conexiones en el pool
    acquire: 30000, // Tiempo máximo en ms que el pool intentará obtener una conexión
    idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
  },
  define: {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    underscored: true, // Usa snake_case para nombres de columnas
    freezeTableName: true // No pluraliza nombres de tablas
  }
};

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    define: config.define
  }
);

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
};

// Función para sincronizar modelos (solo en desarrollo)
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error.message);
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
}; 