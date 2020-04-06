const jwt = require('jwt-simple');
const Profile = require('../models/profile');
const upload = require('../services/uploads');
const resizer = require('../services/resizer');
const config = require("../config");
exports.fetch = function(req, res, next) {
  Profile.findOne({
    user: req.user._id
  }, function(err, results) {
    if (err) {
      return next(err);
    }
  if (results) {
    res.json({results});
  } else {
    res.json({results: {}});
  }
  });
};


exports.update = function(req, res, next) {
  const {
    naam,
    email,
    telefoonnummer,
    straat,
    postcode,
    plaats
  } = req.body;
  var datum = new Date();
  Profile.findOneAndUpdate({
    "user": req.user._id
  }, {
    naam,
    email,
    telefoonnummer,
    straat,
    postcode,
    plaats
  }, {
    upsert: true,
    new: true
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
exports.upload = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return
    } else {
      resizer(req.file.destination, req.file.filename, 'uploads').then(data => {
        Profile.findOneAndUpdate({
          "user": req.user._id
        }, {
          'image': `${config.url}${req.file.filename}`,
          'portimage': `${config.url}480/${req.file.filename}`
        }, {
          upsert: true,
          new: true
        }, (errs, results) => {
          if (errs) {
            res.status(500).json({
              errors: {
                global: "Something went wrong"
              }
            });
          } else {
            res.json({results});
          }
        });
      })
    }
  })
}
