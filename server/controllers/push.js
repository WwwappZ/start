const jwt = require('jwt-simple');
const Push = require('../models/push');
const PushBerichten = require('../models/pushberichten')
const sendpush = require('../services/push')

exports.save = function(req, res, next) {
  const {token, device, os} = req.body;
  Push.findOneAndUpdate({
    'token': token
  }, {
    "token": token,
    "device": device,
    "os": os,
    'date': new Date(),
    "bedrijf": req.user.bedrijf,
    "user": req.user._id
  }, {
    upsert: true,
    setDefaultsOnInsert: true
  }, (err, results) => {
    if (err) {
      res.status(500).json({
        errors: {
          global: "Something went wrong"
        }
      });
    } else {
      res.json({results});
    }
  });

};

exports.send = function(req, res, next) {
  //apn("98eefc3f8dd11375c0cb2b2b7e3159b3ff8fee83cd81a1db92cd96ddc86425cd", "Test Bericht", "Hallo dit is een een testbericht", "event");

}

exports.insert = function(req, res, next) {
  const {titel, beschrijving, planning, datum} = req.body;
  if (planning == "Gepland") {
    PushBerichten.create({
      titel,
      beschrijving,
      planning,
      datum,
      "user": req.user._id,
      "bedrijf": req.user.bedrijf
    }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          errors: {
            global: "Something went wrong"
          }
        });
      } else {
        res.json({results});
      }
    });
  }
  if (planning == "Direct") {
    PushBerichten.create({
      titel,
      beschrijving,
      planning,
      datum,
      verzonden: true,
      "bedrijf": req.user.bedrijf,
        "user": req.user._id
    }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          errors: {
            global: "Something went wrong"
          }
        });
      } else {
        sendpush.sendpush(titel, beschrijving, req);
        res.json({results});
      }
    });
  }
}

exports.fetch = function(req, res, next) {}

exports.devices = function(req, res, next) {
  Push.count({
    "bedrijf": req.user.bedrijf
  }, function(err, items) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json({items});
  });
}

exports.fetchpush = function(req, res, next) {
  Push.findOne({
    user: req.user._id
  }, function(err, results) {
    if (err) {
      return next(err);
    }
    res.json({results});
  });
};

exports.savepushplanning = function(req, res, next) {
  const { planning } = req.body;
  if (planning) {
    Push.update(
      {
        user: req.user._id
      },
      {
        planning: planning
      },
      {
        multi: true
      },
      function(err, results) {
        if (err) {
          return next(err);
        }
        res.json({
          results
        });
      }
    );
  }
};
