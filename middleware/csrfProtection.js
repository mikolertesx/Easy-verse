const Router = require('express').Router();
const csrf = require('csurf');

const csrfProtection = csrf({cookie: true})
Router.use(csrfProtection);

module.exports = Router;