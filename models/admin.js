const mongoose = require('mongoose');
const user = require('../util/user');
const Schema = mongoose.Schema;

//TODO Add hashing.

const AdminSchema = new Schema({
  name: String,
  password: String
})

const AdminModel = mongoose.model('Admin', AdminSchema);
// clear(userModel);

module.exports = AdminModel;