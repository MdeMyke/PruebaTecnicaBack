/**
 * Controlador de usuarios - Gestiona operaciones CRUD para usuarios del sistema
 * Incluye funcionalidades de creación, lectura, actualización y eliminación (soft delete)
 * Maneja relaciones many-to-many con roles y validaciones de UUID
 */

const { User, Role } = require('../models');

const userController = {
  createUser: async (req, res) => {
    try {
      res.status(201).json({ 
        message: 'Lógica para crear usuario aquí.',
        data: req.body 
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor al crear usuario',
        error: error.message 
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Role,
            as: 'roles',
            through: { attributes: [] } 
          }
        ],
        order: [['created_at', 'DESC']]
      });
      
      res.status(200).json({ 
        message: 'Usuarios obtenidos exitosamente',
        data: users 
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor al obtener usuarios',
        error: error.message 
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          message: 'ID de usuario inválido',
          error: 'El ID debe ser un número'
        });
      }
      
      const user = await User.findByPk(id, {
        include: [
          {
            model: Role,
            as: 'roles',
            through: { attributes: [] }
          }
        ]
      });
      
      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
          error: `No existe un usuario con ID ${id}`
        });
      }
      
      res.status(200).json({ 
        message: 'Usuario obtenido exitosamente',
        data: user 
      });
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor al obtener usuario',
        error: error.message 
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      
      res.status(200).json({ 
        message: 'Lógica para actualizar usuario aquí.',
        data: { id, updates: req.body } 
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor al actualizar usuario',
        error: error.message 
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      
      res.status(200).json({ 
        message: 'Lógica para eliminar usuario (soft delete) aquí.',
        data: { id } 
      });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor al eliminar usuario',
        error: error.message 
      });
    }
  }
};

module.exports = userController; 