const path = require('path');
const Router = require('express').Router();
const browserify = require('browserify-middleware');

console.log(__dirname);
const currentPath = path.join(__dirname, '..', 'public', 'js');
Router.use('/js', browserify(currentPath));

module.exports = Router;