const Router = require('express').Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');
const controller = require('../controllers/admin');
const jsonParser = bodyParser.json();

// Add metadata, so that every route has it.
Router.use('/', auth.isAuth, controller.addData);

// /admin/index ->
Router.get('/index', auth.isAuth, controller.getIndex);

Router.get('/verses', auth.isAuth, controller.getVerses);

// API ENDPOINTS.
Router.post('/postverse', jsonParser, controller.postverse);
Router.delete('/deleteverse', jsonParser, controller.deleteverse);

module.exports = Router;