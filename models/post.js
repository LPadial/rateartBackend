 var mongoose = require('mongoose'),
  Schema   = mongoose.Schema;

  var postSchema = new Schema({
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required:true,
      maxlength:200
    },
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }
  });

  module.exports = mongoose.model('Post', postSchema);