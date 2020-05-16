// Edit used for simple work
const verses = require('../models/verse');

module.exports.getAdd = (async (req, res, next) => {
  return res.render('base/add');
});

module.exports.postAdd = (async (req, res, next) => {
  const author = req.body.author;
  const content = req.body.content;

  if (author.trim() === '' || content.trim() === '')
    return res.redirect('/');

  await verses.create({
    author,
    content
  });
  console.log(req.body);
  return res.redirect('/');
});