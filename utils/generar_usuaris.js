const mongoose = require('mongoose');
const Usuari = require(__dirname + '/../models/usuari');
const SHA256 = require('crypto-js/sha256');
mongoose.connect('mongodb://localhost:27017/FilmEs_v3', {
  useNewURLParser: true,
  useUnifiedTopology: true
});
Usuari.collection.drop();
let usu1 = new Usuari({
  login: 'pedroPrueba',
  password: SHA256('1234').toString()
});
usu1.save();
let usu2 = new Usuari({
  login: 'lauraPrueba',
  password: SHA256('5678').toString()
});
usu2.save();
