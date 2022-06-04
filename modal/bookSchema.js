const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  cover_url: {
    type: String,
    required: true,
  },
  drive_url: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  ts: {
    type: Date,
    required: true,
  },
});

const BOOK = mongoose.model("BOOK", bookSchema);

module.exports = BOOK;
