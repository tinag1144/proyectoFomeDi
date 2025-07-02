// src/models/medicamento.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import { Usuario } from '../models/paciente.models.js';

export const Medicamento = sequelize.define('Medicamento', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  dosis: { type: DataTypes.STRING },
  frecuencia: { type: DataTypes.STRING },
  duracion: { type: DataTypes.STRING },
}, {
  tableName: 'medicamentos',
  timestamps: false,
});

Usuario.hasMany(Medicamento, { foreignKey: 'paciente_id' });
Medicamento.belongsTo(Usuario, { foreignKey: 'paciente_id' });
