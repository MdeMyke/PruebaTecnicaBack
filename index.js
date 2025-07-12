const express = require('express');
const { testConnection } = require('./src/database/connection');
const models = require('./src/models');

// Importar rutas
const apiRoutes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba principal
app.get('/', (req, res) => {
  res.json({ 
    message: '¡API de Gestión de Usuarios funcionando!',
    version: '1.0.0',
    endpoints: {
      api: '/api',
      users: '/api/users',
      roles: '/api/roles',
      test: '/api/test',
      dbTest: '/test-db'
    }
  });
});

// Ruta para probar la conexión a la BD
app.get('/test-db', async (req, res) => {
  try {
    await testConnection();
    res.json({ message: 'Conexión a la base de datos exitosa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Configurar rutas de la API
app.use('/api', apiRoutes);

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  
  // Probar conexión a la BD al iniciar
  try {
    await testConnection();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
}); 