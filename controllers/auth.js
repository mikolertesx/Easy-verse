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

  const newUser = await userModel.create({
    username,
    password,
    role
  });

  return res.json({
    'id': newUser._id.toString()
  });
}

module.exports.postLogin = async (req, res, next) => {
  console.log(req.body);
  const user = req.body.username;
  const password = req.body.password;

  const logedUser = await userModel.findOne({username: user})

  if (logedUser) {
    if (logedUser.password === password) {
      return res.json({'message': 'Success!'});
    } else {
      return res.json({'message': 'Wrong password'});
    }
  } else {
    return res.json({ 'message': 'User does not exist'});
  }
};