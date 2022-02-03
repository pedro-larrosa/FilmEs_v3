/**
 * Este es el archivo donde se establece el modelo de las peliculas
 */
const mongoose = require('mongoose');
const { generes } = require('../utils/constants');
const plataformaSchema = require('./plataformaSchema');

let peliculaSchema = new mongoose.Schema({
  titol: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  sinopsis: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  },
  duracio: {
    type: Number,
    required: true,
    min: 0
  },
  genere: {
    type: String,
    required: true,
    enum: generes
  },
  imatge: {
    type: String,
    trim: true
  },
  valoracio: {
    type: Number,
    min: 0,
    max: 5
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'director',
    required: true
  },
  plataformes: [plataformaSchema]
});
let Pelicula = mongoose.model('pelicula', peliculaSchema);

module.exports = Pelicula;
