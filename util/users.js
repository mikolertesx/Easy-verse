const settings = require('./settings');
const jwt = require('jsonwebtoken');

module.exports.signUser = (user) => {
  // TODO Add user verification.
  if (user.name && user.password) {
    return jwt.sign(user, settings.SECRET, (err, token) => {
      if (err) {
        throw new Error(err);
      }
      return token;
    });
  }
  return null;
}

module.exports.loginUser = (user) => {
  // TODO Add user validation.

  // Check whether or not the user is validated.
  return true;
}

module.exports.isValidUser = (user) => {

  if (user.name && user.password) {

  }
}