// Edit used for simple work
const verses = require('../models/verse');

module.exports.getAdd = (async (req, res, next) => {
  return res.render('main/add');
});

module.exports.postAdd = (async (req, res, next) => {
  const author = req.body.author;
  const content = req.body.content;

  if (author.trim() === '' || content.trim() === '')
    return res.redirect('/');

  await verses.create({
    author,
    content,
    votes: {
      likes: 0,
      dislikes: 0
    },
    seen: 0
  });
  console.log(req.body);
  return res.redirect('/');
});