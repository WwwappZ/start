const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// model definition
const WebsiteSchema = new Schema({
  activiteit: String,
  beschrijving: String,
  datum: Date,
  tijd: String,
  bedrijf: {
    type: mongoose.Schema.Types.ObjectId,
  },
  verwerkt: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('website', WebsiteSchema);
