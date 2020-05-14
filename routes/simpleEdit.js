// To be replaced with a complete one, used for debug.
const router = require('express').Router
const controller = require('../controllers/simpleEdit');
const Router = router();

Router.get('/add', controller.getAdd);
Router.post('/add', controller.postAdd);

module.exports = Router;