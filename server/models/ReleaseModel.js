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
      required: true,
      default: 0
    },
    overallRatingAverage: {
      type: Float,
      required: true
    },
    overallRatingTotal: {
      type: Float,
      required: true,
      default: 0
    },
    flatnessAverage: {
      type: Float,
      required: true,
      default: 0
    },
    flatnessTotal: {
      type: Float,
      required: true,
      default: 0
    },
    quietnessAverage: {
      type: Float,
      required: true,
      default: 0
    },
    quietnessTotal: {
      type: Float,
      required: true,
      default: 0
    },
    physicalConditionAverage: {
      type: Float,
      required: true,
      default: 0
    },
    physicalConditionTotal: {
      type: Float,
      required: true,
      default: 0
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
