const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  author:{
    type:String,
    required:true
  },
  genre: [
    {
      type: String,
    },
  ],
  publicationYear: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});




module.exports = mongoose.model("Book", bookSchema);
