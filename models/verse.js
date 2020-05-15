const mongoose = require('mongoose');
// const clear = require('../util/database').clearCollection;
const Schema = mongoose.Schema;

const verseSchema = new Schema({
  author: String,
  content: String
})

verseSchema.static('findRandom', async function(){
  const randomObject = await this.aggregate([
    {
      $sample: { size: 1}
    }
  ]);
  return randomObject[0];
});

const verseModel = mongoose.model('Verse', verseSchema);
module.exports = verseModel;