// src/models/nota.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import { Usuario } from '../models/paciente.models.js';

export const Nota = sequelize.define('Nota', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  contenido: { type: DataTypes.TEXT, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
}, {
  tableName: 'notas',
  timestamps: false
});

Usuario.hasMany(Nota, { foreignKey: 'paciente_id' });
Nota.belongsTo(Usuario, { foreignKey: 'paciente_id' });