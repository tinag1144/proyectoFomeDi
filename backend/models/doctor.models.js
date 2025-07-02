import { DataTypes } from 'sequelize';
import sequelize from '../database.js';


export const Doctor = sequelize.define('Doctor', {
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'doctores',
  timestamps: false,
});
