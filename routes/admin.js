const Router = require('express').Router();
const bodyParser = require('body-parser');
const controller = require('../controllers/admin');

const jsonParser = bodyParser.json();

// Add metadata, so that every route has it.
Router.use('/', controller.addData);

// /admin/index ->
Router.get('/index', controller.getIndex);

Router.get('/verses', controller.getVerses);

// API ENDPOINTS.
Router.post('/postverse', jsonParser, controller.postverse);
Router.delete('/deleteverse', jsonParser, controller.deleteverse);

module.exports = Router;