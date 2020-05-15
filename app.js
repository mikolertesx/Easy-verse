const express = require('express');
const settings = require('./util/settings');
const db = require('./util/database');
const app = express();

app.set('view engine', 'pug');

const forceHTTPS = require('./middleware/forceHTTPS');
const browserify = require('./middleware/browserify');
const handleSession = require('./middleware/handleSession');

//TODO Add a database setup.
//TODO Add a different

const mainRoutes = require('./routes/base');
const editRoutes = require('./routes/simpleEdit');

app.use(forceHTTPS);
app.use(browserify);
app.use(express.static('public'))
app.use(handleSession);


app.use(mainRoutes);
app.use(editRoutes);

db.connectDatabase()
  .then(() => {
    app.listen(settings.PORT);
  })