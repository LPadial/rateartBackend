var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ratingSchema = new Schema({
  value: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
    sparse: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Rating', ratingSchema);