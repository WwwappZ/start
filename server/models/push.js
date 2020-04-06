const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const PushSchema = new Schema({
  token: String,
  device: String,
  os: String,
  date: Date,
  bedrijf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bedrijven'
  },
  planning: {
    type: Array,
    default: [{
			"id" : 4,
			"name" : "donderdag"
		}]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('push', PushSchema);
