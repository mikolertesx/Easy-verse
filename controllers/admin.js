const userModel = require('../models/user');
const verseModel = require('../models/verse');

module.exports.addData = async (req, res, next) => {
  res.locals.admin = {
    verseLength: await verseModel.countDocuments(),
    totalReads: await verseModel.countReads()
  };

  return next();
}

module.exports.getIndex = async (req, res, next) => {
  const moderators = await userModel.getModerators();
  return res.render('admin/index', {
    moderators: moderators
  });
}

module.exports.getVerses = async(req, res, next) => {
  const page = +req.query.page || 1;
  const perPage = 10;
  const verseList = await verseModel.getVerseList(page, perPage);
  const parsedVerses = verseList.map(verse => {
    verse.parsedContent = verse.content.split('\n')
    return verse;
  });
  const totalPages = Math.ceil(await verseModel.countDocuments() / perPage);
  return res.render('admin/verses', {
    nextPage: page + 1,
    prevPage: page - 1,
    totalPages: totalPages,
    currentPage: page,
    verses: parsedVerses
  })
}

// API ENDPOINTS.

module.exports.postverse = async(req, res, next) => {
  const id = req.body.id;
  const result = await verseModel.findByIdAndUpdate(id, {
    $set: {approved: true}
  });
  return res.json({
    message: result
  });
}

module.exports.deleteverse = async(req, res, next) => {
  const id = req.body.id;
  const result = await verseModel.findByIdAndDelete(id);
  console.log(result);
  return res.json({
    message: result
  });
}