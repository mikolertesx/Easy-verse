const verses = require('../models/verse');
const userUtilities = require('../util/userUtilities');

module.exports.getIndex = (async (req, res, next) => {
  const user = req.cookies['user'];

  let attempts = 3;
  let randomVerse;
  let filteredVerse;
  do {
    randomVerse = await verses.aggregate([
      { $sample: { size: 1 } }
    ]);
    filteredVerse = randomVerse[0];
    if (!userUtilities.isIn(user, filteredVerse)) {break;}
    attempts -= 1;
  } while (attempts > 0);

  // It returns an array, this just gets the only one item inside.

  if (user) {
    res.cookie('user', userUtilities.updateSeen(user, filteredVerse));
  }

  const splitMessage = filteredVerse.content.split('\n');
  return res.render('index', {
    verse: filteredVerse,
    contents: splitMessage
  });
})