const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - obtener todas las mediciones
router.get('/', (req, res) => {
  const datos = db.leer();
  res.json(datos);
});

// POST - crear una medición nueva
router.post('/', (req, res) => {
  const { cliente, direccion, valor } = req.body;

  if (!cliente || !direccion || valor == null) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const datos = db.leer();

  const nueva = {
    id: datos.length > 0 ? datos[datos.length - 1].id + 1 : 1,
    cliente,
    direccion,
    valor
  };

  datos.push(nueva);
  db.guardar(datos);

  res.status(201).json(nueva);
});

// DELETE - eliminar medición
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const datos = db.leer();

  const existe = datos.find(m => m.id === id);
  if (!existe) {
    return res.status(404).json({ error: 'Medición no encontrada' });
  }

  const nuevosDatos = datos.filter(m => m.id !== id);
  db.guardar(nuevosDatos);

  res.json({ message: 'Medición eliminada' });
});

module.exports = router;
