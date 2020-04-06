const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const CursistSchema = new Schema({
  voornaam: String,
  achternaam: String,
  email: String,
  geboortedatum: String,
  bedrijf: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"bedrijven"
  },
  ervaring: String,
  image: String,
  portimage: String,
  trainersgroepen: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"trainersgroepen"
  }],
});


module.exports = mongoose.model('cursisten', CursistSchema);
