/**
 * Rutas de usuarios - Define endpoints RESTful para operaciones CRUD de usuarios
 * Incluye creación, lectura, actualización y eliminación (soft delete) de usuarios
 * Maneja parámetros UUID y relaciones con roles
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

/*
POSTMAN EXAMPLES:

1. GET /api/users
   GET http://localhost:3000/api/users
   Response: Lista de todos los usuarios con sus roles

2. GET /api/users/:id
   GET http://localhost:3000/api/users/1
   Response: Usuario específico con sus roles

3. POST /api/users
   POST http://localhost:3000/api/users
   Headers: Content-Type: application/json
   Body: {
     "nombre": "Juan Pérez",
     "email": "juan@example.com",
     "password": "123456"
   }
   Response: Usuario creado

4. PUT /api/users/:id
   PUT http://localhost:3000/api/users/1
   Headers: Content-Type: application/json
   Body: {
     "nombre": "Juan Pérez Actualizado",
     "email": "juan.nuevo@example.com"
   }
   Response: Usuario actualizado

5. DELETE /api/users/:id
   DELETE http://localhost:3000/api/users/1
   Response: Usuario eliminado (soft delete)
*/ 