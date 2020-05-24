const userModel = require('../models/user');

module.exports.getLogin = async (req, res, next) => {
  const length = await userModel.countDocuments();
  const csrfToken = req.csrfToken();
  let link = '/register';
  let text = 'Registrar'

  if (length > 0) {
    link = '/login';
    text = 'Acceder';
  }

  return res.render('auth/login', {
    link,
    csrfToken,
    text
  });
};

module.exports.postRegister = async (req, res, next) => {
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;
  const length = await userModel.countDocuments();
  const role = length === 0 ? 'Admin' : 'Moderator';

  const newUser = await userModel.createUser(username, password, role);

  if (newUser) {
    req.session.user = newUser.toObject();
  }

  return res.redirect('/admin');
}

module.exports.postLogin = async (req, res, next) => {
  console.log(req.body);
  const user = req.body.username;
  const password = req.body.password;
  const logedUser = await userModel.findOne({ username: user })
  req.session.user = logedUser.toObject();
  req.user.seen = [...req.user.seen, ...req.session.user.seen];
  if (logedUser) {
    const isLoggedin = await logedUser.login(password);
    if (isLoggedin) {
      return res.redirect('/admin');
    }
  }

  return res.redirect('/');
};