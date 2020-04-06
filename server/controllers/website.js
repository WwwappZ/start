var moment = require("moment");
const Website = require("../models/website");
exports.fetch = function(req, res, next) {
  Website.find(
    {
      verwerkt: false,
      bedrijf: req.user.bedrijf,
      datum: {
          "$lte": moment().toDate()
      }
    }
  ).sort('-datum').exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    }
  );
};

exports.verwerken = function(req, res, next) {
  const { id } = req.body;
  Website.findOneAndUpdate(
    {
      _id: id
    },
    { $set: { verwerkt: true } },
    (err, results) => {
      if (err) {
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
};
