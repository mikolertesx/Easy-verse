const mongoose = require('mongoose');
const user = require('../util/user');
const Schema = mongoose.Schema;

//TODO Add hashing.
const userSchema = new Schema({
  name: String,
  password: String,
  role: {
    required: true,
    type: String
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;