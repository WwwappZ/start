const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  telefoonnummer: String,
  password: String,
  achternaam: String,
  role: String,
  woonplaats: String,
  mobile: String,
  voornaam: String,
  ipadres: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  bedrijf: {
      type: Schema.Types.ObjectId,
      ref: 'bedrijven'
  },
  SmsAuth: {
    type: Boolean,
    default: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});

// Before saving a model, encrypt the password
userSchema.pre('save', function(next) {
   if (this.isNew) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
} else {
  next();
}
});

//to be used in passport.js
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
