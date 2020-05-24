const Router = require('express').Router();
const controller = require('../controllers/admin');

// Add metadata, so that every route has it.
Router.use('/', controller.addData);

// /admin/index ->
Router.get('/index', controller.getIndex);

module.exports = Router;