const bodyParser = require('body-parser');

module.exports.urlEncodedParser = bodyParser.urlencoded({extended: false});