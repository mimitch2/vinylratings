const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

const releaseSchema = new mongoose.Schema({
  release_id: {
    type: Number,
    required: true
  },
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ratings_count: {
    type: Number,
    required: true,
  },
  overall_rating_average: {
    type: Float,
    required: true

  }

}, { timestamps: true });

releaseSchema.virtual('vinyl_ratings', {
  ref: 'Rating', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'release', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
releaseSchema.set('toObject', { virtuals: true });
releaseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Release", releaseSchema);