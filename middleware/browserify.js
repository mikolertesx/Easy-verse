const fs = require('fs');
const path = require('path');
const Router = require('express').Router();
const browserify = require('browserify-middleware');

const currentPath = path.join(__dirname, '..', 'public', 'js');
if (fs.existsSync(currentPath)){
  console.log('Corriendo browserify con javascript');
  Router.use('/js', browserify(currentPath));
} else {
  console.log('Corriendo version sin javascript');
}

module.exports = Router;