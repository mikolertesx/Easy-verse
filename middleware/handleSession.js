const Router = require('express').Router();
const settings = require('../util/settings');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const createUser = () => {
  return user = {
    'connected': true,
    'aware': false,
    'seen': []
  }
};

Router.use(cookieParser());

Router.use(async (req, res, next) => {
  let user = req.cookies['user'];
  if (!user || user === 'undefined') {
    user = createUser();
    const signedToken = jwt.sign(user, settings.SECRET);
    res.cookie('user', signedToken);
  }
  return next();
})

module.exports = Router;