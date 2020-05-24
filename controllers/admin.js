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
  return res.render('admin/index.pug', {
    moderators: moderators
  });
}