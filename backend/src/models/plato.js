const mongoose = require('mongoose');

const PlatoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ingredientes: { type: [String], required: true },
  precio: { type: Number, required: true },
  imagen: { type: [String], required: true }
});

module.exports = mongoose.model('Plato', PlatoSchema);
