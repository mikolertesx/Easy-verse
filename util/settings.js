module.exports.PORT = process.env.PORT || 3000;
module.exports.SECRET = process.env.SECRET || 'JUST-MONIKA';
module.exports.STAGE = process.env.NODE_ENV || 'development';
module.exports.SSL = process.env.NODE_ENV ? true: false;
module.exports.DATABASE_URL = process.env.DATABASE_URL || '';