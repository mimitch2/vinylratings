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
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  rated_by_user_count: {
    type: Number,
    max: 3,
  }

});

module.exports = mongoose.model("Review", userSchema);