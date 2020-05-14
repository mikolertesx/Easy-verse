const verses = require('../models/verse');

module.exports.getIndex = (async (req, res, next) => {
  const randomVerse = await verses.aggregate([
    { $sample: {size: 1} }
  ]);

  // It returns an array, this just gets the only one item inside.
  const filteredVerse = randomVerse[0];

  // Since HTML can't understand '\n', we should split it.
  const splitMessage = filteredVerse.content.split('\n');
  return res.render('index', {
    verse: filteredVerse,
    contents: splitMessage
  });
})