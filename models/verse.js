const mongoose = require('mongoose');
// const clear = require('../util/database').clearCollection;
const Schema = mongoose.Schema;

const verseSchema = new Schema({
  author: String,
  content: String,
  votes: {
    likes: Number,
    dislikes: Number
  },
  seen: 0
});

verseSchema.static('findRandom', async function () {
  const randomObject = await this.aggregate([
    {
      $sample: { size: 1 }
    }
  ]);
  return randomObject[0];
});

verseSchema.static('fromStringToIds', async function (list) {
  const newArray = list.map((stringId) => {
    return mongoose.Types.ObjectId(stringId);
  })
  return newArray;
});

verseSchema.static('findNewVerse', async function (list) {
  const parsedList = await this.fromStringToIds(list);
  const newUnparsedVerse = await this.aggregate([
    { $match: { _id: { $nin: parsedList } } },
    { $sample: { size: 1 } }
  ]);

  const parsedVerse = newUnparsedVerse[0];

  return parsedVerse;
});

const verseModel = mongoose.model('Verse', verseSchema);
module.exports = verseModel;