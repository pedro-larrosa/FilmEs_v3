const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();

router.get('/', (req, res) => {
  Pelicula.find()
    .then((pelicules) => {
      if (!pelicules || pelicules.length == 0)
        res.render('public_index', { missatge: 'No es van trobar pe·lícules' });
      else res.render('public_index', { pelicules: pelicules });
    })
    .catch(() => {
      res.render('public_error');
    });
});

router.get('/buscar', (req, res) => {
  Pelicula.find({ titol: { $regex: req.query.nombre, $options: 'i' } })
    .then((pelicules) => {
      if (!pelicules || pelicules.length == 0)
        res.render('public_index', { missatge: 'No es van trobar pe·lícules' });
      else res.render('public_index', { pelicules: pelicules });
    })
    .catch(() => {
      res.render('public_error');
    });
});

router.get('/pelicula/:id', (req, res) => {
  Pelicula.findById(req.params.id)
    .populate('director')
    .then((pelicula) => {
      if (!pelicula)
        res.render('public_error', { error: 'Pel·lícula no trobada' });
      else res.render('public_pelicula', { pelicula: pelicula });
    })
    .catch(() => {
      res.render('public_error');
    });
});
module.exports = router;
