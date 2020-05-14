const fs = require('fs');
const path = require('path');
const Router = require('express').Router();
const browserify = require('browserify-middleware');

// Get current path.
const currentPath = path.join(__dirname, '..', 'public', 'js');

// If path exists run browserify.
if (fs.existsSync(currentPath)){
  console.log('Corriendo browserify con javascript');
  Router.use('/js', browserify(currentPath));
} else {
// If path doesn't exists don't run browserify.
  console.log('Corriendo version sin javascript');
}

module.exports = Router;