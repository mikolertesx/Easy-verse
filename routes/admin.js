const Router = require('express').Router();
const controller = require('../controllers/admin');

Router.get('/index', controller.getIndex);

module.exports = Router;