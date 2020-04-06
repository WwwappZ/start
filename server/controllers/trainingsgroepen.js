const jwt = require("jwt-simple");
const Trainingsgroepen = require("../models/trainersgroepen");
const Cursisten = require("../models/cursisten");
var mongoose = require("mongoose");
var _this = this;
exports.fetch = function(req, res, next) {
  var query = {};
  if (req.user.role == "user" || req.user.role == "trainer") {
    query.trainer = req.user._id;
  }
  Trainingsgroepen.find(query)
    .populate("trainer", "voornaam achternaam role")
    .populate("certificaten")
    .populate({ path: "cursisten", options: { sort: { voornaam: -1 } } })
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
};

exports.get = function(req, res, next) {
  Trainingsgroepen.findOne({ _id: req.params.id })
    .populate("trainer", "voornaam achternaam role")
    .populate("certificaten")
    .populate({ path: "cursisten", options: { sort: { voornaam: 1 } },  populate: {
      path: "bedrijf"
    } })
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
};
exports.removecurist = function(req, res, next) {
  const { cursist } = req.body;
  Trainingsgroepen.update(
    { _id: req.params.id },
    {
      $pull: {
        cursisten: cursist
      }
    }
  ).exec(function(err, results) {
    if (err) {
      return next(err);
    }
    res.json({
      results
    });
  });
};

exports.getcurist = function(req, res, next) {
  Trainingsgroepen.find({ cursisten: req.params.id })
    .populate("trainer", "voornaam achternaam role")
    .populate("certificaten")
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
};

exports.setcuristen = function(req, res, next) {
  const { cursisten } = req.body;
  Trainingsgroepen.update(
    { _id: req.params.id },
    {
      $addToSet: { cursisten: { $each: cursisten } }
    }
  ).exec(function(err, results) {
    if (err) {
      res.status(500).json({
        errors: {
          global: "Something went wrong"
        }
      });
    } else {
      res.json({
        results
      });
    }
  });
};
exports.insert = function(req, res, next) {
  const { datum, locatie, titel, trainer, cursisten, certificaten } = req.body;
  Trainingsgroepen.create(
    {
      datum,
      locatie,
      titel,
      trainer,
      cursisten,
      certificaten
    },
    (err, results) => {
      if (err) {
        res.status(500).json({
          errors: {
            global: "Something went wrong"
          }
        });
      } else {
        res.json({
          results
        });
      }
    }
  );
};

exports.update = function(req, res, next) {
  const { datum, titel, trainer, certificaten } = req.body;
  Trainingsgroepen.update(
    { _id: req.params.id },
    {
      datum,
      titel,
      trainer,
      certificaten
    },
    (err, results) => {
      if (err) {
        res.status(500).json({
          errors: {
            global: "Something went wrong"
          }
        });
      } else {
        res.json({
          results
        });
      }
    }
  );
};
