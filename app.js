const express = require('express');
const settings = require('./util/settings');
const app = express();

// Postgre-promise.
const pgp = require('pg-promise')();
const db = pgp(settings.DATABASE_URL);

db.result()
  .then(result => {
    console.log(result);
  });

//TODO Add a database setup.
//TODO Add a bundler.
//TODO Add a different

app.listen(settings.Port);