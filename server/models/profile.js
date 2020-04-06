const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const ProfileSchema = new Schema({
  user: String,
  naam: String,
  email: String,
  telefoonnummer: String,
  straat: String,
  postcode: String,
  plaats: String,
  geboortedatum: Date,
  over: String,
  werk: String,
  image: String,
  portimage: String
});

ProfileSchema.pre('update', function(next) {
  if (this.isNew) {

  }
});

module.exports = mongoose.model('profile', ProfileSchema);
