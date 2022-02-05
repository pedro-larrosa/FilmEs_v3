/**
 * En este archivo se establece el modelo de los usuarios
 */
const mongoose = require('mongoose');

let usuariSchema = new mongoose.Schema({
  login: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 8
  }
});

let Usuari = mongoose.model('usuari', usuariSchema);

module.exports = Usuari;
