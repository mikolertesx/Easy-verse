const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//TODO Add hashing.
const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    required: true,
    type: String
  },
  seen: [],
  voted: [],
  lastSeen: String
});

userSchema.static('createUser', async function(user, password, role) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return this.create({
    username: user,
    password: hashedPassword,
    role: role,
    seen: [],
    voted: [],
    lastSeen: ''
  });
})

userSchema.method('login', async function(password) {
  return bcrypt.compare(password, this.password);
});

userSchema.method('addFields', async function(object) {
  Object.assign(this, object);
  return await this.save();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;