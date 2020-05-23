module.exports.PORT = process.env.PORT || 3000;
module.exports.SECRET = process.env.SECRET || 'JUST-MONIKA';
module.exports.STAGE = process.env.NODE_ENV || 'development';
module.exports.DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/easy-verse';
module.exports.DATABASE_TIMEOUT = this.STAGE === 'development' ? 200 : 50000;
module.exports.SESSION = 'session';
module.exports.SESSION_TTL = 1000 * 60 * 60 * 24 * 7;
module.exports.READATTEMPTS = process.env.READATTEMPTS || 100;
console.log('Fase', this.STAGE);