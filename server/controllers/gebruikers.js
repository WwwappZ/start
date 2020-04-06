const jwt = require('jwt-simple');
const Users = require('../models/user');
var _this = this;
exports.fetch = function(req, res, next) {
    Users.find({
    }).sort({voornaam:1})
    .collation({ locale: "nl" })
    .select("-password")
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
  Users.findOne({ _id: req.params.id })
    .select("-password")
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
  Users.update(
    { _id: req.params.id },
      req.body,
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