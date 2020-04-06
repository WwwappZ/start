const jwt = require('jwt-simple');
const Bedrijven = require('../models/bedrijf');
var _this = this;
exports.fetch = function(req, res, next) {
  if (req.user.role === "root" || req.user.role === "admin" || req.user.role === "hoofdtrainer") {
    Bedrijven.findOne({
      "_id": req.user.bedrijf
    }, function(err, result) {
      if (err) {
        return next(err);
      }
      Bedrijven.find({
        "group": result.group
      }).sort({naam:1})
      .collation({ locale: "nl" })
      .exec(function(err, results) {
        if (err) {
          return next(err);
        }
        res.json({
          results
        });
      });
    });
  } else {
    Bedrijven.find({
      "_id": req.user.bedrijf
    }).sort({naam:1})
    .collation({ locale: "nl" })
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
  };
}
exports.insert = function(req, res, next) {
  const {
    naam,
    group,
    website
  } = req.body;
  Bedrijven.create({
    naam,
    group,
    website
  }, (err, results) => {
    if (err) {
      res.status(500).json({
        errors: {
          global: "Something went wrong",
          error: err
        }
      });
    } else {
      res.json({
        results
      });
    }
  });
};

exports.get = function(req, res, next) {
  Bedrijven.findOne({ _id: req.params.id })
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
};

exports.update = function(req, res, next) {
  const {
    naam,
    group,
    website
  } = req.body;
  Bedrijven.update(
    { _id: req.params.id },
    {
      naam,
      group,
      website
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