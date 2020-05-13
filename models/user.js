const mongoose = require('mongoose');
const clear = require('../util/clearInDev');
const Schema = mongoose.Schema;

//TODO Add hashing.

const userSchema = new Schema({
  name: String,
  password: String
})

const userModel = mongoose.model('User', userSchema);

// clear(userModel);

module.exports = userModel;