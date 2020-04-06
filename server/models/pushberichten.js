const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const SmsSchema = new Schema({
  titel: {
    type: String,
    required: true
  },
  beschrijving: {
    type: String,
    required: true
  },
  planning: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  datum: {
    type: Date,
    required: false
  },
  bedrijf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bedrijven'
  },
  verzonden: {
    type: Boolean,
    required: true,
    default: 0
  },
});


module.exports = mongoose.model('PushBerichten', SmsSchema);
