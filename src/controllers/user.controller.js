/**
 * Controlador de usuarios - Gestiona operaciones CRUD para usuarios del sistema
 * Incluye funcionalidades de creación, lectura, actualización y eliminación (soft delete)
 * Maneja relaciones many-to-many con roles y validaciones de UUID
 */

const { User, Role } = require('../models');
const crypto = require('crypto');

// Función para hashear contraseñas
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Función para verificar contraseñas
const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

const userController = {
  createUser: async (req, res) => {
    try {
      const { nombre, email, password } = req.body;

      // Validaciones básicas
      if (!nombre || !email || !password) {
        return res.status(400).json({
          message: 'Datos incompletos',
          error: 'Se requieren nombre, email y password'
        });
      }

      // Verificar si el email ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({
          message: 'Email ya registrado',
          error: 'Ya existe un usuario con este email'
        });
      }

      // Crear el usuario
      const newUser = await User.create({
        nombre,
        email,
        password_hash: hashPassword(password)
      });

      // Obtener el usuario creado con sus roles (vacío por defecto)
      const userWithRoles = await User.findByPk(newUser.id, {
        include: [
          {
            model: Role,
            as: 'roles',
            through: { attributes: [] }
          }
        ]
      });

      res.status(201).json({ 
        message: 'Usuario creado exitosamente',
        data: userWithRoles
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
        order: [['created_at', 'DESC']],
        paranoid: true // Solo usuarios no eliminados (soft delete)
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
        ],
        paranoid: true 
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
      const { nombre, email, password } = req.body;

      // Validar ID
      if (isNaN(id)) {
        return res.status(400).json({
          message: 'ID de usuario inválido',
          error: 'El ID debe ser un número'
        });
      }

      // Buscar el usuario
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
          error: `No existe un usuario con ID ${id}`
        });
      }

      // Verificar si el email ya existe (si se está actualizando)
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(409).json({
            message: 'Email ya registrado',
            error: 'Ya existe un usuario con este email'
          });
        }
      }

      // Actualizar el usuario
      const updateData = {
        nombre: nombre || user.nombre,
        email: email || user.email
      };

      // Si se proporciona una nueva contraseña, hashearla
      if (password) {
        updateData.password_hash = hashPassword(password);
      }

      await user.update(updateData);

      // Obtener el usuario actualizado con sus roles
      const updatedUser = await User.findByPk(id, {
        include: [
          {
            model: Role,
            as: 'roles',
            through: { attributes: [] }
          }
        ]
      });

      res.status(200).json({ 
        message: 'Usuario actualizado exitosamente',
        data: updatedUser
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

      // Validar ID
      if (isNaN(id)) {
        return res.status(400).json({
          message: 'ID de usuario inválido',
          error: 'El ID debe ser un número'
        });
      }

      // Buscar el usuario
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
          error: `No existe un usuario con ID ${id}`
        });
      }

      // Soft delete usando Sequelize
      await user.destroy();

      res.status(200).json({ 
        message: 'Usuario eliminado exitosamente',
        data: { id: user.id, nombre: user.nombre }
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