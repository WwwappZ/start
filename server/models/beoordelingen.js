const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model definition
const BeoordelingenSchema = new Schema({
 algemeen: Object,
 fun2dance: Object,
 kindertheater: Object,
 pitches: Object,
 sportenspel: Object,
 kwaliteitenspel: Object,
  cursist: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"cursist"
  },
  traininger: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"traininer"
  },
  training: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"training"
  },
  datum: Date
});


module.exports = mongoose.model('beoordelingen', BeoordelingenSchema);
