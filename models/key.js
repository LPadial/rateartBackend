 var mongoose = require('mongoose'),
  Schema   = mongoose.Schema;

  var keySchema = new Schema({
    key: {
      type: String,
      required: true
    },
    pathFile: {
      type: String,
      required:true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  module.exports = mongoose.model('Key', keySchema);