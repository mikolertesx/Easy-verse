const Router = require('express').Router();
const csrf = require('csurf');
const auth = require('../middleware/auth');
const controller = require('../controllers/auth');
const bodyParser = require('body-parser');

const csrfProtection = csrf({ cookie: true});
const parseForm = bodyParser.urlencoded({ extended: false });

Router.get('/login', auth.isNotAuth, csrfProtection, controller.getLogin);
Router.post('/login', auth.isNotAuth, parseForm, csrfProtection, controller.postLogin);
Router.post('/register', auth.isNotAuth, parseForm, csrfProtection, controller.postRegister);
Router.post('/logout', auth.isAuth);

module.exports = Router;