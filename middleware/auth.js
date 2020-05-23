module.exports.isAuth = (req, res, next) => {
  if (req.session.user && 
    (req.session.role === 'Admin'
    || req.session.role === 'Moderator')) {
    return next();
  }
  return res.redirect('/');
}

module.exports.isNotAuth = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  return res.redirect('/');
}