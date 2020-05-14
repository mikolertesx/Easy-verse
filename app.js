const express = require('express');
const settings = require('./util/settings');
const db = require('./util/database');
const app = express();

app.set('view engine', 'pug');

const browserify = require('./middleware/browserify');

//TODO Add a database setup.
//TODO Add a different

app.use(browserify);
const mainRoutes = require('./routes/base');
app.use(express.static('public'))

app.use(mainRoutes);

db.connectDatabase()
  .then(() => {
    app.listen(settings.PORT);
  })