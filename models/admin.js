const mongoose = require('mongoose');
// const clear = require('../util/database').clearCollection;
const Schema = mongoose.Schema;

//TODO Add hashing.

const AdminSchema = new Schema({
  name: String,
  password: String
})

const AdminModel = mongoose.model('Admin', AdminSchema);

// clear(userModel);

module.exports = AdminModel;