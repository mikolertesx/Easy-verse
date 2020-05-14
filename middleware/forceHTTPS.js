const settings = require('../util/settings');
const Router = require('express').Router();
const forceHTTPS = settings.STAGE === 'production';
console.log(forceHTTPS ? 'Forzando HTTPS': 'No se esta forzando HTTPS');

// If the page is on production it will force HTTPS.
Router.use((req, res, next) => {
  if (forceHTTPS) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  return next();
})

module.exports = Router;