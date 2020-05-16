const settings = require('./settings');
const mongoose = require('mongoose');

if (settings.STAGE === 'development') {
  console.log('DATABASE:', settings.DATABASE_URL);
}

module.exports.connectDatabase = async () => {
  await mongoose.connect(settings.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Conexion a base de datos verificada.');

  return mongoose.connection.on('connected', () => {
    return true;
  })
}

module.exports.clearCollection = (model, log = true) => {
  if (settings.STAGE === 'development') {
    if (log) { console.log(`Restarting ${model.modelName}`) }
    return model.deleteMany({})
  }
  return;
}