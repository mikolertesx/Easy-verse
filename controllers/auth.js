const userModel = require('../models/user');

module.exports.getLogin = async (req, res, next) => {
  const length = await userModel.countDocuments();
  const csrfToken = req.csrfToken();
  console.log(csrfToken);

  let link = '/register';
  if (length > 0) {
    link = '/login';
  }

  return res.render('auth/login', {
    link,
    csrfToken
  });
};

module.exports.postRegister = (req, res, next) => {
  console.log(req.body);
  return res.json({
    'id': 'something something'
  });
}

module.exports.postLogin = (req, res, next) => {
  return res.status(200).json({
    message: 'Logged in!'
  });
}