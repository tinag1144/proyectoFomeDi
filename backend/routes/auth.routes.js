// src/routes/auth.routes.js
import { Router } from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../models/paciente.models.js";
const router = Router();

// 🔐 REGISTRO PACIENTE
router.post("/register", async (req, res) => {
  const { nombre_completo, correo, password } = req.body;

  if (!nombre_completo || !correo || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevo = await Usuario.create({ nombre_completo, correo, password: hashedPassword });
    res.status(201).json({ message: "Usuario registrado", usuario: nuevo });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// 🔐 LOGIN PACIENTE
router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: usuario.id,
        nombre_completo: usuario.nombre_completo,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
