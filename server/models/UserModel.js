const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    avatarUrl: {
      type: String
    },
    discogsUserId: {
      type: Number,
      unique: true,
      required: true
    },
    releasesRated: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.virtual('vinylRatings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'user'
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
