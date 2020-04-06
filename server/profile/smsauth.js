const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const SmsSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  smscode: {
    type: String,
    required: true
  },
  telefoonnummer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});


module.exports = mongoose.model('SmsAuth', SmsSchema);
