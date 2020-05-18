const Router = require('express').Router();
const settings = require('../util/settings');
const cookieParser = require('cookie-parser');
const userUtilities = require('../util/user');
const jwt = require('jsonwebtoken');

Router.use(cookieParser());

Router.use(async (req, res, next) => {
  let user = req.cookies['user'];
  if (!user || user === 'undefined') {
    user = userUtilities.createUser();
    const signedToken = jwt.sign(user, settings.SECRET);
    res.cookie('user', signedToken);
    req.user = user;
  } else {
    req.user = userUtilities.decryptUser(user);
  }
  return next();
})

module.exports = Router;