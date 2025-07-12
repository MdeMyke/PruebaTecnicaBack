/**
 * Rutas principales - Centraliza y organiza todas las rutas de la API
 * Define prefijos para usuarios y roles, incluye endpoint de prueba
 */

const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const roleRoutes = require('./role.routes');

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

router.get('/test', (req, res) => {
  res.json({ 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: '/api/users',
      roles: '/api/roles',
      test: '/api/test'
    }
  });
});

module.exports = router;

/*
POSTMAN EXAMPLES:

1. GET /api/test
   GET http://localhost:3000/api/test
   Response: Información de la API con endpoints disponibles

2. GET / (ruta principal)
   GET http://localhost:3000/
   Response: Información general de la API

3. GET /test-db
   GET http://localhost:3000/test-db
   Response: Estado de conexión a la base de datos
*/ 