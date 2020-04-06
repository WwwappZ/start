const Push = require('../models/push');
const PushBerichten = require('../models/pushberichten')
const apn = require('../services/apn');
const gcmm = require('../services/gcm');

exports.sendpush = function (title, messages, req) {
  var registrationIdsIOS = [];
  var registrationIdsandroid = [];
  Push.find({
    "bedrijf": req.user.bedrijf
  }, function(err, items) {
    items.forEach(function(obj) {
      if (obj.os == "iOS") {
        registrationIdsIOS.push(obj.key);
      }
      if (obj.os == "Android") {
        registrationIdsandroid.push(obj.key);
      }
    });
  }).then(doc => {
    if (registrationIdsIOS.length > 0) {
      apn(registrationIdsIOS, title, messages);
    }
    if (registrationIdsandroid.length > 0) {
      gcmm(registrationIdsandroid, title, messages);
    }
  }).catch(err => {
    console.error(err)
  })
}

exports.sendpushcron =  function() {
  var cutoff = new Date();
  var registrationIdsIOS = [];
  var registrationIdsandroid = [];
  PushBerichten.findOneAndUpdate({
    datum: {
      $lte: cutoff
    },
    verzonden: false
  }, {
    verzonden: true
  }, function(err, obj) {
    if (obj) {
      Push.find({"bedrijf": obj.bedrijf}, function(err, items) {
        items.forEach(function(obj) {
          if (obj.os == "iOS") {
            registrationIdsIOS.push(obj.key);
          }
          if (obj.os == "Android") {
            registrationIdsandroid.push(obj.key);
          }
        });
      }).then(doc => {
        if (registrationIdsIOS.length > 0) {
          apn(registrationIdsIOS, obj.titel, obj.omschrijving);
        }
        if (registrationIdsandroid.length > 0) {
          gcmm(registrationIdsandroid, obj.titel, obj.omschrijving);
        }
      }).catch(err => {
        console.error(err)
      })
    }
  })
}
