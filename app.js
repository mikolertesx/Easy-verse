const express = require('express');
const settings = require('./util/settings');
const app = express();

console.log('Database', settings.DATABASE_URL, 'PORT', settings.PORT)

//TODO Add a database setup.
//TODO Add a bundler.
//TODO Add a different

app.listen(settings.Port);