const router = require('express').Router
const controller = require('../controllers/base');

const Router = router();
Router.get('/', controller.getIndex);

module.exports = Router;