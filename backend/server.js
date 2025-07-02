import express from "express";
import cors from "cors";
import "dotenv/config.js";
import sequelize from "../backend/database.js";
import { Usuario } from "../backend/models/paciente.models.js";
import { Doctor } from "../backend/models/doctor.models.js";
import { Diagnostico } from "../backend/models/diagnostico.models.js";
import { Estudio } from "../backend/models/estudio.models.js";
import { Medicamento } from "../backend/models/medicamento.models.js";
import { Nota } from "../backend/models/nota.models.js";
import authRouter from "../backend/routes/auth.routes.js";
import { medicoRouter } from "../backend/routes/medico.routes.js";
import  historialRouter from "../backend/routes/historial.routes.js";
import { diagnosticoRouter } from "../backend/routes/diagnostico.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas - Ojo que las rutas están organizadas y el prefijo tiene que coincidir con lo que usás en el frontend
app.use("/api/auth", authRouter);                // Registro/login pacientes
app.use("/api/medicos", medicoRouter);           // Registro/login médicos
app.use("/api/pacientes", historialRouter);      // Diagnósticos, estudios, medicamentos, notas
app.use("/api/diagnosticos", diagnosticoRouter); // Opcional, solo para diagnosticos específicos

// Sincronización de tablas con Sequelize (ordenada)
try {
  await sequelize.authenticate();
  console.log("✅ Conexión a MySQL con Sequelize exitosa");

  // Primero sincronizamos las tablas bases
  await Usuario.sync();
  await Doctor.sync();

  // Después las tablas con relaciones FK
  await Diagnostico.sync();
  await Estudio.sync();
  await Medicamento.sync();
  await Nota.sync();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("❌ Error al conectar con Sequelize:", error);
}
