// src/models/estudio.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import { Usuario } from '../models/paciente.models.js';

export const Estudio = sequelize.define('Estudio', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  resultado: { type: DataTypes.TEXT },
  fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
}, {
  tableName: 'estudios',
  timestamps: false
});

Usuario.hasMany(Estudio, { foreignKey: 'paciente_id' });
Estudio.belongsTo(Usuario, { foreignKey: 'paciente_id' });