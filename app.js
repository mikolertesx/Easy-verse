const express = require('express');
const settings = require('./util/settings');
const db = require('./util/database');
const app = express();

//TODO Add a database setup.
//TODO Add a bundler.
//TODO Add a different

const mainRoutes = require('./routes/base');

app.use(mainRoutes);

db.connectDatabase()
  .then(() => {
    app.listen(settings.PORT);
  })