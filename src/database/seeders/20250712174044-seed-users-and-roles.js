'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar usuarios de ejemplo
    await queryInterface.bulkInsert('users', [
      {
        nombre: 'Administrador',
        email: 'admin@example.com',
        password_hash: '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Usuario Prueba',
        email: 'user@example.com',
        password_hash: '$2a$10$0123456789abcdefghijklmnopqrstuvwxyz',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    // Obtener los IDs de los usuarios y roles para asignar
    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (?, ?)',
      {
        replacements: ['admin@example.com', 'user@example.com'],
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const roles = await queryInterface.sequelize.query(
      'SELECT id, nombre FROM roles WHERE nombre IN (?, ?, ?)',
      {
        replacements: ['admin', 'editor', 'usuario'],
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const userMap = {};
    const roleMap = {};
    
    users.forEach(user => {
      userMap[user.email] = user.id;
    });
    
    roles.forEach(role => {
      roleMap[role.nombre] = role.id;
    });

    await queryInterface.bulkInsert('user_roles', [
      // Admin tiene roles 'admin' y 'editor'
      {
        user_id: userMap['admin@example.com'],
        role_id: roleMap['admin'],
        created_at: new Date()
      },
      {
        user_id: userMap['admin@example.com'],
        role_id: roleMap['editor'],
        created_at: new Date()
      },
      // Usuario normal tiene rol 'usuario'
      {
        user_id: userMap['user@example.com'],
        role_id: roleMap['usuario'],
        created_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
    
    await queryInterface.bulkDelete('users', {
      email: ['admin@example.com', 'user@example.com']
    }, {});
  }
};
