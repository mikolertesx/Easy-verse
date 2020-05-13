console.log('Fase', process.env.NODE_ENV);

module.exports.PORT = process.env.PORT || 3000;
module.exports.SECRET = process.env.SECRET || 'JUST-MONIKA';
module.exports.STAGE = process.env.NODE_ENV || 'development';
module.exports.DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/easy-verse';