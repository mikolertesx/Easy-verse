const settings = require('./settings');
const mongoose = require('mongoose');
const verse = require('../models/verse');

if (settings.STAGE === 'development') {
  console.log('DATABASE:', settings.DATABASE_URL);
}

module.exports.connectDatabase = () => {
  return mongoose.connect(settings.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}