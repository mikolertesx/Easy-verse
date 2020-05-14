const verses = require('../models/verse');

module.exports.getIndex = (async (req, res, next) => {
  const randomVerse = await verses.aggregate([
    { $sample: {size: 1} }
  ]);
  const filteredVerse = randomVerse[0];
  return res.render('index', {
    verse: filteredVerse
  });
})