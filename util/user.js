const jwt = require('jsonwebtoken');
const settings = require('./settings');
const verses = require('../models/verse');

module.exports.createUser = () => {
  return user = {
    'seen': [],
    'voted': []
  };
};

module.exports.saveUser = (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Error('User is not in the request object.');
  }
  const encryptedUser = jwt.sign(user, settings.SECRET);
  res.cookie('user', encryptedUser);
}

module.exports.decryptUser = (user) => {
  const decodedUser = jwt.decode(user, settings.SECRET);
  return decodedUser;
}

module.exports.updateWatchedList = (user, filteredVerse) => {
  const verseId = filteredVerse._id.toString();
  let newSeen;
  if (!user) {
    user = this.createUser();
    newSeen = new Set([]);
  } else {
    newSeen = new Set([...user.seen]);
  }
  newSeen.add(verseId);
  user.seen = Array.from(newSeen);
  user.lastSeen = verseId;
  return user;
}

module.exports.isIn = (user, filteredVerse) => {
  if (!user) { return false; }
  // const decodedUser = this.decryptUser(user);
  const verse = filteredVerse._id.toString();
  return user.seen.includes(verse);
}

module.exports.userReadAll = async (user) => {
  const allDocuments = await verses.countDocuments()
  const lengthUser = this.decryptUser(user).seen.length;
  if (allDocuments <= lengthUser) { 
    return true; 
  }
  return false;
}