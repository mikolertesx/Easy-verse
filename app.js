const express = require('express');
const bodyParser = require('body-parser');
const settings = require('./util/settings');
const db = require('./util/database');
const app = express();

app.set('view engine', 'pug');

const forceHTTPS = require('./middleware/forceHTTPS');
const browserify = require('./middleware/browserify');

//TODO Add a database setup.
//TODO Add a different

app.use(forceHTTPS);
app.use(browserify);
const mainRoutes = require('./routes/base');
const editRoutes = require('./routes/simpleEdit');

app.use(express.static('public'))
app.use(mainRoutes);
app.use(editRoutes);

db.connectDatabase()
  .then(() => {
    app.listen(settings.PORT);
  })