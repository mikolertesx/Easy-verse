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
  seen: 0,
  approved: {
    type: Boolean,
    required: true
  }
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
    { $match: { _id: { $nin: parsedList }, approved: true } },
    { $sample: { size: 1 } }
  ]);
  const parsedVerse = newUnparsedVerse[0];

  return parsedVerse;
});

verseSchema.static('getVerseList', async function (page, perPage) {
  const skip = perPage * (page - 1);
  const limit = perPage;

  // Sorting by a field that is equal isn't deterministic,
  // Therefore you need to add an id next to it.
  const verseList = await this.aggregate([
    { $sort: { "approved": 1, _id: 1}},
    { $skip: skip },
    { $limit: limit }
  ]);
  return verseList;
})

verseSchema.static('countReads', async function () {
  // Match all the reads, and increase the reads.
  try {
  const totalReads = await this.aggregate([{
    $group: {
      _id: null,
      sum: { $sum: "$seen" }
    }
  }]);
  return totalReads[0].sum;
  } catch {
    return 0;
  }
});

const verseModel = mongoose.model('Verse', verseSchema);
module.exports = verseModel;