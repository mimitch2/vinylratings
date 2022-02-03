const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  user_id: {
    type: Number,
    unique: true,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);