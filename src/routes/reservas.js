// routes/reservas.js
const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Crear una reserva
router.post('/', async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    const reservaGuardada = await nuevaReserva.save();
    res.status(201).json(reservaGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
