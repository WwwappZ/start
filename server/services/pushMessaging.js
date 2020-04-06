var moment = require("moment");
const Push = require("../models/push");
const Website = require("../models/website");
const PushBerichten = require("../models/pushberichten");
const startgcm = require("./gcm")
exports.sendpushcron = function(dag) {
  Website.aggregate(
    [{
      $match: {
        verwerkt: false,
        datum: {
          "$lte": moment().toDate()
        }
      }
    }, {
      $group: {
        _id: "$bedrijf",
        activiteiten: {
          $sum: 1
        }
      }
    }, {
      $sort: {
        datum: -1
      }
    }],
    function(err, obj) {
      obj.forEach(function(element) {
        if (element.activiteiten > 0) {
        Push.find({
          bedrijf: element._id,
          'planning.id': dag
        }, function(err, results) {
          if (err) {
            return next(err);
          }
          results.forEach(function(doc) {
            if (doc.os == "android") {
              startgcm([doc.token], "Bericht van Recraplan", "Je op dit moment " + element.activiteiten + " activiteiten open staan").then(function(result) {
                console.log(result);
              }).catch((err) => {
                console.log(err);
              })
            }
          })
        });
      }
      })
    });
};
