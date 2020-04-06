const jwt = require('jwt-simple');
const Beoordelingen = require('../models/beoordelingen');

exports.fetch = function(req, res, next) {
    Beoordelingen.findOne({
      _id: req.params.id 
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

exports.fetchcursist = function(req, res, next) {
  const {
     cursist,
     training  } = req.body;
  Beoordelingen.findOne({
    cursist,
    training 
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
    algemeen, 
    fun2dance,
    kindertheater,
    pitches,
    sportenspel,
    kwaliteitenspel,
     cursist,
     traininger,
     training  } = req.body;  
  var datum = new Date();
  Beoordelingen.findOneAndUpdate({
    "training": training,
    "cursist": cursist
  }, {
    algemeen,
    fun2dance,
    kindertheater,
    pitches,
    sportenspel,
    kwaliteitenspel,
     cursist,
     traininger,
     training,
     datum 
  }, {
    upsert: true,
    new: true
  }, (err, results) => {
    if (err) {
      res.status(500).json({
        errors: {
          global: "Something went wrong toch"
        }
      });
    } else {
      res.json({results});
    }
  });
};

