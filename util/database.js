const settings = require('./settings');
const mongoose = require('mongoose');

if (settings.STAGE === 'development') {
  console.log('DATABASE:', settings.DATABASE_URL);
}

module.exports.connectDatabase = async () => {
  try {
    return await mongoose.connect(settings.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: settings.DATABASE_TIMEOUT
    });
  } 
  catch (err) {
    throw new Error(err);
  }
}

module.exports.clearCollection = (model, log = true) => {
  if (settings.STAGE === 'development') {
    if (log) { console.log(`Restarting ${model.modelName}`) }
    return model.deleteMany({})
  }
  return;
}