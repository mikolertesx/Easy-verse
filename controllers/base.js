const verses = require('../models/verse');
const userUtilities = require('../util/user');

const findNewVerse = async (user) => {
  let seenList;
  if (user) {
    const seenLength = user.seen.length;
    const documentLength = await verses.countDocuments();
    if (seenLength >= documentLength) {
      const lastSeen = user.lastSeen;
      seenList = lastSeen ? [lastSeen] : [];
    } else {
      seenList = user.seen;
    }
  } else {
    seenList = [];
  }
  return verses.findNewVerse(seenList);
}

module.exports.getIndex = (async (req, res, next) => {
  const user = req.user;
  let randomVerse;

  randomVerse = await findNewVerse(user);
  if (!randomVerse) {
    return res.render('main/index', {
      verse: undefined
    });
  }
  if (!userUtilities.isIn(req.user, randomVerse)){
    await verses.updateOne({ _id: randomVerse._id }, { $inc: { 'seen': 1 } });
  }

  req.user = userUtilities.updateWatchedList(user, randomVerse);
  userUtilities.saveUser(req, res);
  console.log(req.user)
  const splitMessage = randomVerse.content.split('\n');
  randomVerse.parsedMessage = splitMessage;
  return res.render('main/index', {
    verse: randomVerse
  });
})