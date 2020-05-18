const verses = require('../models/verse');

module.exports.getVotes = async (req, res, next) => {
  const id = req.params.id;
  const verse = await verses.findById(id);
  const votes = verse.votes;
  res.json(votes);
}

module.exports.upVote = async(req, res, next) => {
  const id = req.body.id;
  const verse = await verses.findById(id);
  verse.votes.likes ++;
  await verse.save();
  return res.json({message: 'ok'});
}

module.exports.downVote = async(req, res, next) => {
  const id = req.body.id;
  const verse = await verses.findById(id);
  verse.votes.dislikes ++;
  await verse.save();
  return res.json({ message: 'ok' });
}