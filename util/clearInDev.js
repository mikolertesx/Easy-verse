const settings = require('./settings');
// Simple method to clean files.
module.exports = (model, log = true) => {
  if (settings.STAGE === 'development'){
    if (log) {console.log(`Restarting ${model.modelName}`)}
    return model.deleteMany({})
  }
  return;
}