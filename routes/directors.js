/**
 * En este archivo se establecen las rutas encargadas de los servicios
 * relacionados con los directores
 */
const express = require('express');
const autenticacion = require('../utils/auth');

let Director = require(__dirname + '/../models/director.js');
let Pelicula = require(__dirname + '/../models/pelicula.js');

let router = express.Router();

router.get('/', autenticacion, (req, res) => {
  Director.find()
    .then((resultat) => {
      res.render('admin_directors', { directors: resultat });
    })
    .catch(() => {
      res.render('admin_error');
    });
});

router.get('/nou', autenticacion, (req, res) => {
  res.render('admin_directors_form');
});

router.get('/editar/:id', (req, res) => {
  Director.findById(req.params.id)
    .then((resultat) => {
      res.render('admin_directors_form', { director: resultat });
    })
    .catch(() => {
      res.render('admin_error');
    });
});

router.post('/', autenticacion, (req, res) => {
  let nouDirector = new Director({
    ...req.body
  });

  nouDirector
    .save()
    .then(() => {
      res.redirect(req.baseUrl);
    })
    .catch(() => {
      res.render('admin_error');
    });
});

router.put('/:id', autenticacion, (req, res) => {
  Director.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body
      }
    },
    { new: true }
  )
    .then((resultado) => {
      if (resultado) res.redirect(req.baseUrl);
      else
        res.render('admin_error', {
          error: "No s'ha trobat el director per actualitzar"
        });
    })
    .catch(() => {
      res.render('admin_error');
    });
});

router.delete('/:id', autenticacion, (req, res) => {
  Pelicula.findOne({ director: req.params.id })
    .then((pelicula) => {
      if (pelicula)
        res.render('admin_error', {
          error:
            "No s'ha pogut esborrar el director perquè té una pel·lícula associada"
        });
      else
        Director.findByIdAndRemove(req.params.id).then((resultat) => {
          if (resultat) res.redirect(req.baseUrl);
          else
            res.render('admin_error', {
              error: "No s'ha trobat el director per eliminar"
            });
        });
    })
    .catch(() => {
      res.render('admin_error');
    });
});

module.exports = router;
