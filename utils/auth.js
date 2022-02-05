//En este fichero se exporta la función para el middleware de autenticacion de usuario
let autenticacion = (req, res, next) => {
  if (req.session && req.session.usuari) return next();
  else res.redirect('/auth/login');
};

module.exports = autenticacion;
