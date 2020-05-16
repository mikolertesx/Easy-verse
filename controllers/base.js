const mongoose = require('mongoose');
const verses = require('../models/verse');
const userUtilities = require('../util/user');

const fromStringToIds = (stringArray) => {
  const newArray = stringArray.map((stringId) => {
    return mongoose.Types.ObjectId(stringId);
  })
  return newArray;
}

const findNewVerse = async (user) => {
  const decryptedUser = userUtilities.decryptUser(user);
  let seenList; // List of reflections seen by user.

  // If user exists.
  if (decryptedUser) {
    const seenLength = decryptedUser.seen.length;
    const documentLength = await verses.countDocuments();
    if (seenLength >= documentLength) {
      seenList = [];
    } else {
      seenList = decryptedUser.seen;
    }
  } else {
    seenList = [];
  }

  const parsedList = fromStringToIds(seenList);

  const newUnparsedVerse = await verses.aggregate([
    { $match: { _id: { $nin: parsedList } } },
    { $sample: { size: 1 } }
  ]);

  const parsedVerse = newUnparsedVerse[0];

  return parsedVerse;
}

module.exports.getIndex = (async (req, res, next) => {
  const user = req.cookies['user'];
  let randomVerse;

  randomVerse = await findNewVerse(user);
  res.cookie('user', userUtilities.updateWatchedList(user, randomVerse),
  { sameSite: 'Lax' }); // Avoids cookie deprecation.
  
  if (!userUtilities.isIn(user, randomVerse)){
    await verses.updateOne({ _id: randomVerse._id }, { $inc: { 'seen': 1 } });
  }

  const splitMessage = randomVerse.content.split('\n');
  randomVerse.parsedMessage = splitMessage;
  return res.render('base/index', {
    verse: randomVerse
  });
})