// models/Reserva.js
const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  fecha: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  servicio: { type: String },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reserva', reservaSchema);
