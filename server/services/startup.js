var crypto = require("crypto");
const User = require('../models/user');
const Bedrijf = require('../models/bedrijf');
const Profile = require('../models/profile')
const config = require('../config');
const Token = require("../models/tokens");
const mailer = require('./mailer')

exports.checkuser = function() {
  User.find({}, function(err, existingUser) {
    if (existingUser && !existingUser.length > 0) {
      const bedrijf = new Bedrijf(config.bedrijf);
      bedrijf.save(function(err) {
        if (err) {
          return next(err);
        }
        const user = new User({
          email: config.auth.username,
          password: config.auth.password,
          telefoonnummer: config.auth.telefoonnummer,
          bedrijf: bedrijf._id,
          achternaam: config.auth.achternaam,
          woonplaats: config.auth.woonplaats,
          voornaam: config.auth.voornaam,
          role: "admin"
        });
        user.save(function(err) {
          if (err) {
            return next(err);
          }
          const profitem = config.profile
          profitem.user = user._id
          const profile = new Profile(profitem)
          profile.save(function(err) {
            if (err) {
              return next(err);
            }
            var token = new Token({
              _userId: user._id,
              token: crypto.randomBytes(16).toString("hex")
            });
            token.save(function(err) {
              if (err) {
                return res.status(500).send({
                  msg: err.message
                });
              }
              var text = {
                to: config.auth.username,
                subject: "Activeer je account",
                text: "Hallo " + config.auth.username + ",\n\n" + "Je hebt een account aangemaakt via " + config.domain + ". Om je account te activieren moet je op de onderstaande link klikken: \n" + config.domain + "/signup/verify/" + token.token + ".\n\n" + " Met vriendelije groet, \n\n" + " Stichting promotie Gemeente Epe"
              }
              mailer.send(text.subject, text.text, text.to);
            })
          })
        })
      })
    }
  });
}
