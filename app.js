const express = require('express');
const cookieParser = require('cookie-parser');
const settings = require('./util/settings');
const db = require('./util/database');
const app = express();

app.set('view engine', 'pug');

const forceHTTPS = require('./middleware/forceHTTPS');
const browserify = require('./middleware/browserify');
const createSession = require('./middleware/createSession');

const mainRoutes = require('./routes/base');
const editRoutes = require('./routes/edit');
const authRoutes = require('./routes/auth');
const votesRoutes = require('./routes/votes');
const adminRoutes = require('./routes/admin');


app.use(forceHTTPS);
app.use(browserify);
app.use(express.static('public'))
app.use(cookieParser());

app.use(createSession);

app.use(mainRoutes);
app.use(editRoutes);
app.use(authRoutes);
app.use('/votes', votesRoutes);
app.use('/admin', adminRoutes);

// 404 page.
app.use((req, res, next)=> {
  res.render('utils/404');
})

db.connectDatabase()
  .then(() => {
    app.listen(settings.PORT);
  })
  .catch(() => {
    if (settings.STAGE === 'development') {
      console.log('Parece que no hay una base de datos corriendo. Asegurate de utilizar Mongo.');
    } else {
      console.log(`No se logra establecer acceso a la base de datos. ${settings.DATABASE_URL}`);
    }
  })