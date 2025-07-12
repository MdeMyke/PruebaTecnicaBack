const express = require('express');
const { testConnection } = require('./src/database/connection');
const models = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
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