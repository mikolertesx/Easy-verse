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
  let seenList;
  if (user) {
    const seenLength = user.seen.length;
    const documentLength = await verses.countDocuments();
    if (seenLength >= documentLength) {
      seenList = [];
    } else {
      seenList = user.seen;
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
  const user = req.user;
  let randomVerse;

  randomVerse = await findNewVerse(user);
  req.user = userUtilities.updateWatchedList(user, randomVerse);
  
  if (!userUtilities.isIn(user, randomVerse)){
    await verses.updateOne({ _id: randomVerse._id }, { $inc: { 'seen': 1 } });
  }

  userUtilities.saveUser(req, res);

  console.log(user);

  const splitMessage = randomVerse.content.split('\n');
  randomVerse.parsedMessage = splitMessage;
  return res.render('base/index', {
    verse: randomVerse
  });
})