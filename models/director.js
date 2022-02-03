/**
 * En este fichero se establece el modelo director de la base de datos
 */
const mongoose = require('mongoose');

let directorSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 5
  },
  anyNaixement: Number
});

let Director = mongoose.model('director', directorSchema);

module.exports = Director;
