const jwt = require("jwt-simple");
const Certificaat = require("../models/certificaten");
const upload = require("../services/uploads");

exports.fetch = function(req, res, next) {
  Certificaat.find({}, function(err, results) {
    if (err) {
      return next(err);
    }
    if (results) {
      res.json({ results });
    } else {
      res.json({ results: {} });
    }
  });
};

exports.save = function(req, res, next) {  
  upload(req, res, function(err) {
    const { naam } = req.body;    
    if (err) {
      console.log(err);
      return;
    } else {      
        Certificaat.create(
        {
          naam,
          datum: new Date(),
          bestand: req.file.filename
        },
        (errs, results) => {
          if (errs) {
            res.status(500).json({
              errors: {
                global: "Something went wrong"
              }
            });
          } else {
            res.json({ results });
          }
        }
      );
    }
  });
};
