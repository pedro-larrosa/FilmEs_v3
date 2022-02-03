let autenticacion = (req, res, next) => {
  if (req.session && req.session.usuari) return next();
  else res.redirect('/auth/login');
};

module.exports = autenticacion;
