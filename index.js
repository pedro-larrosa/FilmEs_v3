/**
 * Este es el archivo que se ejecuta, donde hacemos la conexión con la base de datos
 * y establecemos los servicios http a cada uno de los modelos de la base de datos
 */
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const pelicules = require(__dirname + '/routes/pelicules');
const public = require(__dirname + '/routes/public');
const auth = require(__dirname + '/routes/auth');

mongoose.connect('mongodb://localhost:27017/FilmEs_v3', {
  useNewURLParser: true,
  useUnifiedTopology: true
});

let app = express();
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

app.use(
  session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use('/admin', pelicules);
app.use('/auth', auth);
app.use('/', public);
app.get('', (req, res) => {
  res.redirect(req.baseUrl + '/');
});
app.get('**', (req, res) => {
  res.render('public_error', { error: 'Pàgina no trobada' });
});

app.listen(8080, 'localhost', () =>
  console.log('Servidor puesto en marcha en http://localhost:8080')
);
