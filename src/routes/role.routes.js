/**
 * Rutas de roles - Define endpoints para operaciones de lectura de roles
 * Proporciona acceso a listado de roles y consulta por ID
 */

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);

module.exports = router;

/*
POSTMAN EXAMPLES:

1. GET /api/roles
   GET http://localhost:3000/api/roles
   Response: Lista de todos los roles disponibles

2. GET /api/roles/:id
   GET http://localhost:3000/api/roles/1
   Response: Rol específico (admin)
   
   GET http://localhost:3000/api/roles/2
   Response: Rol específico (editor)
   
   GET http://localhost:3000/api/roles/3
   Response: Rol específico (usuario)
*/ 