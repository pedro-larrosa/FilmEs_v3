/**
 * Aqui esta el esquema de las plataformas de las películas, separado en un
 * archivo a parte para estar más ordenado
 */
const mongoose = require('mongoose');
const moment = require('moment');

let plataformaSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  data: {
    type: Date,
    default: new Date(moment().add(3, 'years'))
  },
  quantitat: {
    type: Boolean,
    default: false
  }
});

module.exports = plataformaSchema;
