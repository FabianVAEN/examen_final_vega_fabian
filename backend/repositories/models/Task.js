const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database');

// Modelo de Task
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El título no puede estar vacío'
      },
      len: {
        args: [3, 255],
        msg: 'El título debe tener al menos 3 caracteres'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'PENDING',
    validate: {
      isIn: {
        args: [['PENDING', 'IN_PROGRESS', 'DONE']],
        msg: 'El status debe ser PENDING, IN_PROGRESS o DONE'
      }
    }
  }
}, {
  tableName: 'tasks',
  timestamps: true
});

module.exports = Task;
