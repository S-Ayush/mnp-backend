const mongoose = require("mongoose");

const bookUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  books: { type: [mongoose.Schema.Types.ObjectId], required: true },
});

const BookUser = mongoose.model("BOOKUSER", bookUserSchema);

module.exports = BookUser;
