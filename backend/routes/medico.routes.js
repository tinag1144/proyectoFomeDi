// src/routes/medico.routes.js
import express from "express";
import bcrypt from "bcrypt";
import { Doctor } from "../models/doctor.models.js";

export const medicoRouter = express.Router();

// REGISTRO MÉDICO
medicoRouter.post("/registro-medico", async (req, res) => {
  const { nombre_completo, correo, password, especialidad } = req.body;

  if (!nombre_completo || !correo || !password || !especialidad) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const doctorExistente = await Doctor.findOne({ where: { correo } });
    if (doctorExistente) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Doctor.create({
      nombre_completo,
      correo,
      password: hashedPassword,
      especialidad,
    });

    res.status(201).json({ message: "Médico registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar médico:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// LOGIN MÉDICO
medicoRouter.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  try {
    const doctor = await Doctor.findOne({ where: { correo } });

    if (!doctor) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const passwordValida = await bcrypt.compare(password, doctor.password);

    if (!passwordValida) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    res.status(200).json({ 
        message: "Inicio de sesión exitoso", 
        doctorId: doctor.id,
        doctorNombre: doctor.nombre_completo
});

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
