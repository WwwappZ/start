const jwt = require("jwt-simple");
const Cursisten = require("../models/cursisten");
const upload = require("../services/uploads");
const resizer = require("../services/resizer");
const config = require("../config");
var _this = this;
exports.fetch = function(req, res, next) {
  let query = {}
  if (req.user.role == "user") {
    query.bedrijf = req.user.bedrijf 
  }
  
  Cursisten.find(query)
    .populate("bedrijf")
    .populate({
      path: 'cursisten._id',
      model: 'trainersgroepen'
    }).sort({"voornaam": 1})
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

exports.get = function(req, res, next) {
  Cursisten.findOne({ _id: req.params.id })
    .populate("bedrijf")
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
};
exports.insert = function(req, res, next) {
  const {
    voornaam,
    achternaam,
    email,
    geboortedatum,
    bedrijf,
    ervaring
  } = req.body;
  Cursisten.create(
    {
      voornaam,
      achternaam,
      email,
      geboortedatum,
      bedrijf,
      ervaring
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
  const {
    voornaam,
    achternaam,
    email,
    geboortedatum,
    bedrijf,
    ervaring
  } = req.body;
  Cursisten.update(
    { _id: req.params.id},
      {
      voornaam,
      achternaam,
      email,
      geboortedatum,
      bedrijf,
      ervaring
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

exports.upload = function(req, res, next) {

  if (req.file =="undefined" && !req.file.destination && !req.file.filename) {
    res.status(500).json({
      errors: {
        global: "Something went wrong"
      }
    });
  }
  try {
    upload(req, res, function(err) {
      if (err || !req.file.destination) {
        console.log(err);
        return;
      } else {
        resizer(req.file.destination, req.file.filename, "uploads").then(data => {
          Cursisten.findOneAndUpdate(
            { _id: req.params.id },
            {
              image: `${config.url}${req.file.filename}`,
              portimage: `${config.url}480/${req.file.filename}`
            },
            {
              upsert: true,
              new: true
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
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        global: "Something went wrong"
      }
    });
  }
  
};

