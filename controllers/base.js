const verses = require('../models/verse');
const userUtilities = require('../util/user');

module.exports.getIndex = (async (req, res, next) => {
  const user = req.cookies['user'];
  let attempts = 100;
  let randomVerse;

  // Try to get a not-seen reflection.
  do {
    randomVerse = await verses.findRandom()
    if (!userUtilities.isIn(user, randomVerse)) { break; }
    attempts -= 1;
  } while (attempts > 0);

  if (user) {
    res.cookie('user', userUtilities.updateWatchedList(user, randomVerse),
      { sameSite: 'Lax' }); // Avoids deprecation.
  }

  const splitMessage = randomVerse.content.split('\n');
  randomVerse.parsedMessage = splitMessage;
  return res.render('base/index', {
    verse: randomVerse
  });
})