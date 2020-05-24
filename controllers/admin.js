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
  const perPage = 2;
  const getVerses = await verseModel.getVerseList(page, perPage);
  const totalPages = Math.ceil(await verseModel.countDocuments() / perPage);
  return res.render('admin/verses', {
    nextPage: page + 1,
    prevPage: page - 1,
    totalPages: totalPages,
    currentPage: page,
    verses: getVerses
  })
}