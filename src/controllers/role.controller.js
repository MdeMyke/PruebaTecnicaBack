/**
 * Controlador de roles - Gestiona operaciones de lectura para roles del sistema
 * Proporciona funcionalidades para obtener todos los roles y roles por ID
 * Incluye validaciones de ID numérico y manejo de errores
 */

const { Role } = require('../models');

const roleController = {
  getAllRoles: async (req, res) => {
    try {
      const roles = await Role.findAll({
        order: [['id', 'ASC']]
      });
      
      res.status(200).json({ 
        message: 'Roles obtenidos exitosamente',
        data: roles 
      });
    } catch (error) {
      console.error('Error al obtener roles:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor al obtener roles',
        error: error.message 
      });
    }
  },

  getRoleById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          message: 'ID de rol inválido',
          error: 'El ID debe ser un número'
        });
      }
      
      const role = await Role.findByPk(id);
      
      if (!role) {
        return res.status(404).json({
          message: 'Rol no encontrado',
          error: `No existe un rol con ID ${id}`
        });
      }
      
      res.status(200).json({ 
        message: 'Rol obtenido exitosamente',
        data: role 
      });
    } catch (error) {
      console.error('Error al obtener rol por ID:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor al obtener rol',
        error: error.message 
      });
    }
  }
};

module.exports = roleController; 