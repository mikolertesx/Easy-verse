const userModel = require('../models/user');


module.exports.getIndex = async (req, res, next) => {
  const moderators = await userModel.getModerators();
  return res.render('admin/index.pug', {
    moderators: moderators
  });
}