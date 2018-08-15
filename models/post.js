 var mongoose = require('mongoose'),
  Schema   = mongoose.Schema;

  var postSchema = new Schema({
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required:true,
      maxlength:20
    },
    description: {
      type: String,
      required:true,
      maxlength:200
    },
    dateUpload:{
      type: Date,
      default: Date.now
    },
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }
  });

  module.exports = mongoose.model('Post', postSchema);