module.exports.PORT = process.env.PORT || 3000;
module.exports.SECRET = process.env.SECRET || 'JUST-MONIKA';
module.exports.STAGE = process.env.NODE_ENV || 'development';
module.exports.DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/easy-verse';
module.exports.READATTEMPTS = process.env.READATTEMPTS || 100;
console.log('Fase', this.STAGE);