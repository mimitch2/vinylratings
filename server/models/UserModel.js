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
  releases_rated: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

userSchema.virtual('vinyl_ratings', {
  ref: 'Rating', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'user', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", userSchema);