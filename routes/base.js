const router = require('express').Router
const verse = require('../models/verse');

const Router = router();

Router.get('/', async (req, res, next) => {
  console.log('Someone here');
  const verses = await verse.find();
  res.send(verses);
});

module.exports = Router;