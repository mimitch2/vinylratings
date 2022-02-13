const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const releaseSchema = new mongoose.Schema(
  {
    releaseId: {
      type: Number,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    ratingsCount: {
      type: Number,
      required: true
    },
    overallRatingAverage: {
      type: Float,
      required: true
    },
    flatnessAverage: {
      type: Float,
      required: true
    },
    quietnessAverage: {
      type: Float,
      required: true
    },
    physicalConditionAverage: {
      type: Float,
      required: true
    }
  },
  { timestamps: true }
);

releaseSchema.virtual('vinylRatings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'release'
});

releaseSchema.virtual('currentUserRating', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'release'
});

releaseSchema.set('toObject', { virtuals: true });
releaseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Release', releaseSchema);
