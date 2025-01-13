const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  borrowedBooks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BorrowedBook",
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
