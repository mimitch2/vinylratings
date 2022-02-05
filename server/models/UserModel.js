const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  discogs_user_id: {
    type: Number,
    unique: true,
    required: true,
  },
  // ratings: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Rating'
  // }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);