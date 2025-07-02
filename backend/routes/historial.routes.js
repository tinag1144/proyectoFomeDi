// src/routes/historial.routes.js
import { Router } from "express";
import { Diagnostico } from "../models/diagnostico.models.js";
import { Estudio } from "../models/estudio.models.js";
import { Medicamento } from "../models/medicamento.models.js";
import { Nota } from "../models/nota.models.js";

const router = Router();

// POST: Agregar diagnóstico
router.post("/:id/diagnosticos", async (req, res) => {
  try {
    const { descripcion } = req.body;
    const paciente_id = req.params.id;
    const nuevo = await Diagnostico.create({ descripcion, paciente_id });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar diagnóstico", detalle: error.message });
  }
});

// POST: Agregar estudio
router.post("/:id/estudios", async (req, res) => {
  try {
    const { nombre, resultado } = req.body;
    const paciente_id = req.params.id;
    const nuevo = await Estudio.create({ nombre, resultado, paciente_id });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar estudio", detalle: error.message });
  }
});

// POST: Agregar medicamento
router.post("/:id/medicamentos", async (req, res) => {
  try {
    const { nombre, dosis, frecuencia, duracion } = req.body;
    const paciente_id = req.params.id;
    const nuevo = await Medicamento.create({ nombre, dosis, frecuencia, duracion, paciente_id });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar medicamento", detalle: error.message });
  }
});

// POST: Agregar nota
router.post("/:id/notas", async (req, res) => {
  try {
    const { contenido } = req.body;
    const paciente_id = req.params.id;
    const nuevo = await Nota.create({ contenido, paciente_id });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar nota", detalle: error.message });
  }
});

// GET: Diagnósticos
router.get("/:id/diagnosticos", async (req, res) => {
  try {
    const paciente_id = req.params.id;
    const lista = await Diagnostico.findAll({ where: { paciente_id } });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener diagnósticos", detalle: error.message });
  }
});

// GET: Estudios
router.get("/:id/estudios", async (req, res) => {
  try {
    const paciente_id = req.params.id;
    const lista = await Estudio.findAll({ where: { paciente_id } });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudios", detalle: error.message });
  }
});

// GET: Medicamentos
router.get("/:id/medicamentos", async (req, res) => {
  try {
    const paciente_id = req.params.id;
    const lista = await Medicamento.findAll({ where: { paciente_id } });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener medicamentos", detalle: error.message });
  }
});

// GET: Notas
router.get("/:id/notas", async (req, res) => {
  try {
    const paciente_id = req.params.id;
    const lista = await Nota.findAll({ where: { paciente_id } });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener notas", detalle: error.message });
  }
});

export default router;

