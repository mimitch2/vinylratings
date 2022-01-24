const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  release_id: {
    type: Number,
    required: true
  },
  quietness: {
    type: Number,
    required: true
  },
  clarity: {
    type: Number,
    required: true
  },
  notes: String,
  user_name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },

});

module.exports = mongoose.model("Review", userSchema);