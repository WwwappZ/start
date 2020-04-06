const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const BedrijfSchema = new Schema({
  naam: String,
  group: String,
  website: String
});


module.exports = mongoose.model('bedrijven', BedrijfSchema);
