const express = require('express');
const SHA256 = require('crypto-js/sha256');

let Usuari = require(__dirname + '/../models/usuari.js');

let router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth_login');
});

router.post('/login', (req, res) => {
  Usuari.find({
    login: req.body.login,
    password: SHA256(req.body.password) + ''
  })
    .then((result) => {
      if (!result || result.length == 0) throw new Error();

      req.session.usuari = result[0].login;
      res.redirect('/admin');
    })
    .catch(() => {
      res.render('auth_login', { error: 'Usuari incorrecte' });
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
