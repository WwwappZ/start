const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// model definition
const LogboekSchema = new Schema({
  activiteit: String,
  betalend: Boolean,
  datum: Date,
  deelnemers: Number,
  doelgroep: String,
  hulpkrachten: Number,
  recreatieleider: Number,
  samenwerkinghoreca: Boolean,
  alexsammy: Boolean,
  soortactiviteit: String,
  stagiaires: Number,
  tijd: String,
  vakantie: String,
  weer: String,
  bedrijf: {
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("logboeken", LogboekSchema);
