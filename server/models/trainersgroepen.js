const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const TrainingsgroepSchema = new Schema({
  datum: Date,
  locatie: String,
  titel: String,
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  cursisten: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"cursisten"
  }],
  certificaten: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"certificaten"
  },
});


module.exports = mongoose.model('trainersgroepen', TrainingsgroepSchema);
