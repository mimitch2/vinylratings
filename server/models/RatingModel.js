const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const ratingSchema = new mongoose.Schema({
  quietness: {
    type: Number,
    required: true
  },
  flatness: {
    type: Number,
    required: true
  },
  physical_condition: {
    type: Number,
    required: true
  },
  notes: String,
  release: {
    type: Schema.Types.ObjectId,
    ref: 'Release',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Rating", ratingSchema);