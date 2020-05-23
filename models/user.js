const mongoose = require('mongoose');
const user = require('../util/user');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//TODO Add hashing.
const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    required: true,
    type: String
  }
});

userSchema.static('createUser', async function(user, password, role) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return this.create({
    username: user,
    password: hashedPassword,
    role: role
  });
})

userSchema.method('login', async function(user, password) {
  return bcrypt.compare(password, this.password);
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;