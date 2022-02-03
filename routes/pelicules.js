/**
 * Este archivo se encarga de las peticiones http de las peliculas de la base de datos
 */

const express = require('express');
const multer = require('multer');
const { generes, plataformes } = require('../utils/constants');
const autenticacion = require('../utils/auth');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let Director = require(__dirname + '/../models/director.js');
let router = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

let upload = multer({ storage: storage });

//GET Todas las peliculas
router.get('/', autenticacion, (req, res) => {
  Pelicula.find()
    .populate('director')
    .then((resultat) => {
      res.render('admin_pelicules', { pelicules: resultat });
    })
    .catch(() => {
      res.render('admin_error');
    });
});

router.get('/pelicules/nova', autenticacion, async (req, res) => {
  res.render('admin_pelicules_form', {
    directors: await Director.find(),
    generes: generes,
    plataformes: plataformes
  });
});

router.get('/pelicules/editar/:id', autenticacion, (req, res) => {
  Director.find()
    .then((directors) => {
      Pelicula.findById(req.params.id)
        .populate('director')
        .then((resultat) => {
          if (!resultat || resultat.length <= 0)
            res.render('admin_error', { error: 'Pel·lícula no trobada' });
          else
            res.render('admin_pelicules_form', {
              pelicula: resultat,
              directors: directors,
              generes: generes,
              plataformes: plataformes
            });
        })
        .catch(() => {
          res.render('admin_error');
        });
    })
    .catch(() => {
      res.render('admin_error');
    });
});

router.post(
  '/pelicules',
  autenticacion,
  upload.single('imatge'),
  (req, res) => {
    let filename = req.file ? req.file.filename : undefined;
    let novaPelicula = new Pelicula({
      titol: req.body.titol,
      sinopsis: req.body.sinopsis,
      duracio: req.body.duracio,
      genere: req.body.genere,
      valoracio: req.body.valoracio,
      director: req.body.director,
      imatge: filename
    });

    if (req.body.plataformes) {
      if (typeof req.body.plataformes == 'string')
        req.body.plataformes = new Array(req.body.plataformes);

      req.body.plataformes.forEach((plataforma) => {
        novaPelicula.plataformes.push({ nom: plataforma });
      });
    }

    novaPelicula
      .save()
      .then(() => {
        res.redirect(req.baseUrl);
      })
      .catch((error) => {
        res.render('admin_error', {
          error: error
        });
      });
  }
);

router.put(
  '/pelicules/:id',
  autenticacion,
  upload.single('imatge'),
  (req, res) => {
    let filename = req.file ? req.file.filename : undefined;

    Pelicula.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          titol: req.body.titol,
          sinopsis: req.body.sinopsis,
          duracio: req.body.duracio,
          genere: req.body.genere,
          valoracio: req.body.valoracio,
          director: req.body.director,
          imatge: filename
        }
      },
      { new: true }
    )
      .then((resultado) => {
        if (resultado) {
          let plataformes = [];

          if (req.body.plataformes) {
            if (typeof req.body.plataformes == 'string')
              req.body.plataformes = new Array(req.body.plataformes);

            req.body.plataformes.forEach((plataforma) => {
              plataformes.push(
                resultado.plataformes.find(
                  (plat) => plat.nom == plataforma
                ) ?? {
                  nom: plataforma
                }
              );
            });
          }
          resultado.plataformes = plataformes;

          resultado.save();
          res.redirect(req.baseUrl);
        } else
          res.render('admin_error', {
            error: "No s'ha trobat la pel·lícula per actualitzar"
          });
      })
      .catch((error) => {
        res.render('admin_error');
      });
  }
);

router.delete('/pelicules/:id', autenticacion, (req, res) => {
  Pelicula.findByIdAndRemove(req.params.id)
    .then((resultado) => {
      if (resultado) res.redirect(req.baseUrl);
      else
        res.render('admin_error', {
          error: "No s'ha trobat la pel·licula per eliminar"
        });
    })
    .catch(() => {
      res.render('admin_error');
    });
});

module.exports = router;
