const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    quietness: {
      type: Number,
      required: true
    },
    flatness: {
      type: Number,
      required: true
    },
    physicalCondition: {
      type: Number,
      required: true
    },
    notes: String,
    release: {
      type: Schema.Types.ObjectId,
      ref: 'Release',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// releaseSchema.virtual('currentUserRating', {
//   ref: 'Release', //The Model to use
//   localField: '_id', //Find in Model, where localField
//   foreignField: 'rating', // is equal to foreignField
// });

// // Set Object and Json property to true. Default is set to false
// releaseSchema.set('toObject', { virtuals: true });
// releaseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Rating', ratingSchema);
