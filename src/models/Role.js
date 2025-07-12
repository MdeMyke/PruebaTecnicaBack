const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isIn: [['admin', 'editor', 'usuario']]
    }
  }
}, {
  tableName: 'roles',
  timestamps: false, 
  underscored: true  
});

module.exports = Role; 