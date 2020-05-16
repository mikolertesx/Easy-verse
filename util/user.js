const jwt = require('jsonwebtoken');
const settings = require('./settings');
const verses = require('../models/verse');

module.exports.decryptUser = (user) => {
  const decodedUser = jwt.decode(user, settings.SECRET);
  return decodedUser;
}

module.exports.updateWatchedList = (user, filteredVerse) => {
  const decodedUser = this.decryptUser(user);
  const newSeen = new Set([...decodedUser.seen]);
  newSeen.add(filteredVerse._id.toString());
  decodedUser.seen = Array.from(newSeen);
  const signedUser = jwt.sign(decodedUser, settings.SECRET)
  return signedUser;
}

module.exports.isIn = (user, filteredVerse) => {
  if (!user) { return false; }
  const decodedUser = this.decryptUser(user);
  const verse = filteredVerse._id.toString();
  return decodedUser.seen.includes(verse);
}

module.exports.userReadAll = async (user) => {
  const allDocuments = await verses.countDocuments()
  const lengthUser = this.decryptUser(user).seen.length;
  if (allDocuments <= lengthUser) { 
    return true; 
  }
  return false;
}