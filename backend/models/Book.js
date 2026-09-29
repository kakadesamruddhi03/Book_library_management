const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  availability: {
    type: String,
    enum: ["Available", "Issued"],
    default: "Available"
  },

  description: {
    type: String,
    default: "No description available."
  },

  pdfUrl: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Book", bookSchema);