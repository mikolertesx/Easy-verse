const mongoose = require('mongoose');
const clear = require('../util/clearInDev');
const Schema = mongoose.Schema;

const verseSchema = new Schema({
  author: String,
  content: String
})

const verseModel = mongoose.model('Verse', verseSchema);
module.exports = verseModel;