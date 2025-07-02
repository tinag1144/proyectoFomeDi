import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import { Usuario } from "../models/paciente.models.js";

export const Diagnostico = sequelize.define("Diagnostico", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id",
    },
  },
}, {
  tableName: "diagnosticos",
  timestamps: false,
});

// Relaciones Sequelize:
Diagnostico.belongsTo(Usuario, { foreignKey: "paciente_id" });
Usuario.hasMany(Diagnostico, { foreignKey: "paciente_id" });
