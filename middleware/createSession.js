const Router = require('express').Router();
const settings = require('../util/settings');
const userUtilities = require('../util/user');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const store = new MongoStore({
  uri: settings.DATABASE_URL,
  collection: settings.SESSION
});

const restoreFromSession = (req, res, user) => {
  const sessionUser = req.session.user;
  const newUser = {...user};
  if (sessionUser) {
    console.log('RESTORED');
    newUser.seen = sessionUser.seen;
    newUser.lastSeen = sessionUser.lastSeen;
    newUser.voted = sessionUser.voted;
  };
  return newUser;
}

Router.use(session({
  secret: settings.SECRET,
  cookie: {
    maxAge: settings.SESSION_TTL
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

Router.use(async (req, res, next) => {
  const userSession = req.session.user;
  if (userSession) {
    console.log('Usuario existe');
  } else {
    console.log('Usuario no existe.');
  }

  let user = req.cookies['user'];
  if (!user || user === 'undefined') {
    user = userUtilities.createUser();
    user = restoreFromSession(req, res, user);
    const signedToken = jwt.sign(user, settings.SECRET);
    res.cookie('user', signedToken);
    req.user = user;
  } else {
    req.user = userUtilities.decryptUser(user);
  }

  res.locals.user = req.user;

  if (userSession) {
    const newUserSession = {...userSession, ...req.user};
    const dbUser = await userModel.findOne({_id: newUserSession._id.toString()});
    if (dbUser) {
    await dbUser.addFields(req.user);
    req.session.user = newUserSession;
    res.locals.user = newUserSession;
    console.log(userSession);
    } else {
      // Data is no longer there.
      console.log('Usuario no existe, borrando sesion.');
      req.session.destroy();
    }
  }

  return next();
})

module.exports = Router;