const express = require('express');
const settings = require('./util/settings');
const db = require('./util/database');
const app = express();
//TODO Add a database setup.
//TODO Add a bundler.
//TODO Add a different

db.connectDatabase()
  .then(() => {
    app.listen(settings.Port);
  })