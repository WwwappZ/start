const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const CertificaatSchema = new Schema({
  naam: String,
  bestand: String,
  datum: Date
});


module.exports = mongoose.model('certificaten', CertificaatSchema);
