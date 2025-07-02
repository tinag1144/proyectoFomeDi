import express from "express";
import { Diagnostico } from "../models/diagnostico.models.js";

export const diagnosticoRouter = express.Router();

// Crear diagnóstico
diagnosticoRouter.post("/", async (req, res) => {
  try {
    const { descripcion, fecha, paciente_id } = req.body;
    if (!descripcion || !paciente_id) {
      return res.status(400).json({ message: "Descripción y paciente_id son obligatorios" });
    }
    const nuevoDiagnostico = await Diagnostico.create({ descripcion, fecha, paciente_id });
    res.status(201).json(nuevoDiagnostico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear diagnóstico" });
  }
});

// Obtener todos los diagnósticos de un paciente
diagnosticoRouter.get("/paciente/:pacienteId", async (req, res) => {
  try {
    const diagnosticos = await Diagnostico.findAll({
      where: { paciente_id: req.params.pacienteId },
      order: [["fecha", "DESC"]],
    });
    res.json(diagnosticos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener diagnósticos" });
  }
});

// Actualizar diagnóstico
diagnosticoRouter.put("/:id", async (req, res) => {
  try {
    const { descripcion, fecha } = req.body;
    const diagnostico = await Diagnostico.findByPk(req.params.id);
    if (!diagnostico) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" });
    }
    diagnostico.descripcion = descripcion ?? diagnostico.descripcion;
    diagnostico.fecha = fecha ?? diagnostico.fecha;
    await diagnostico.save();
    res.json(diagnostico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar diagnóstico" });
  }
});

// Eliminar diagnóstico
diagnosticoRouter.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Diagnostico.destroy({ where: { id: req.params.id } });
    if (!eliminado) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" });
    }
    res.json({ message: "Diagnóstico eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar diagnóstico" });
  }
});
