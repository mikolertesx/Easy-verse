const Router = require('express').Router();
const csrf = require('csurf');
const controller = require('../controllers/auth');
const bodyParser = require('body-parser');

const csrfProtection = csrf({ cookie: true});
const parseForm = bodyParser.urlencoded({ extended: false });

Router.get('/login', csrfProtection, controller.getLogin);
Router.post('/login', parseForm, csrfProtection, controller.postLogin);
Router.post('/register', parseForm, csrfProtection, controller.postRegister);

module.exports = Router;