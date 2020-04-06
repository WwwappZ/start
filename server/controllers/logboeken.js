var moment = require('moment');
var ObjectId = require('mongodb').ObjectID
const Logboeken = require('../models/logboek')
const Bedrijven = require('../models/bedrijf')
const Website = require('../models/website')
exports.insert = function (req, res, next) {
  const {
    activiteit,
    betalend,
    datum,
    alexsammy,
    deelnemers,
    doelgroep,
    hulpkrachten,
    recreatieleider,
    samenwerkinghoreca,
    soortactiviteit,
    stagiaires,
    tijd,
    vakantie,
    weer
  } = req.body;
  Logboeken.create({
    "user": req.user._id,
    "bedrijf": req.user.bedrijf,
    activiteit,
    betalend,
    alexsammy,
    datum: moment(datum, 'DD/MM/YYYY').toDate(),
    deelnemers,
    doelgroep,
    hulpkrachten,
    recreatieleider,
    samenwerkinghoreca,
    soortactiviteit,
    stagiaires,
    tijd,
    vakantie,
    weer
  }, (err, results) => {
    if (err) {
      console.log(err);
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

exports.update = function (req, res, next) {
  const {
    activiteit,
    betalend,
    datum,
    alexsammy,
    deelnemers,
    doelgroep,
    hulpkrachten,
    recreatieleider,
    samenwerkinghoreca,
    soortactiviteit,
    stagiaires,
    tijd,
    vakantie,
    weer
  } = req.body;
  Logboeken.findOneAndUpdate({
    _id: req.params.id 
    },{
    activiteit,
    betalend,
    alexsammy,
    datum: moment(datum).toDate(),
    deelnemers,
    doelgroep,
    hulpkrachten,
    recreatieleider,
    samenwerkinghoreca,
    soortactiviteit,
    stagiaires,
    tijd,
    vakantie,
    weer
  }, (err, results) => {
    if (err) {
      console.log(err);
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
  Logboeken.findOne({ _id: req.params.id })
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
};
exports.delete = function(req, res, next) {
  Logboeken.remove({ _id: req.params.id })
    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        results
      });
    });
};
exports.fetch = function (req, res, next) {
  var query = {};
  if (req.body.hasOwnProperty('datum')) {
    if (req.body.datum.startdate && req.body.datum.enddate) {
      query.datum = {
        "$gte": moment(req.body.datum.startdate).toDate(),
        "$lte": moment(req.body.datum.enddate).toDate(),
      };
    }
  } else if (req.body.hasOwnProperty('jaar')) {
    query.datum = {
      "$gte": moment(req.body.jaar + '/01/01','YYYY/MM/DD').startOf('year').toDate(),
      "$lte": moment(req.body.jaar + '/01/01','YYYY/MM/DD').endOf('year').toDate(),
    };
  }
  if (req.body.hasOwnProperty('soortactiviteit')) {
    query.soortactiviteit = req.body.soortactiviteit
  }
  if (req.body.hasOwnProperty('doelgroep')) {
    query.doelgroep = req.body.doelgroep
  }
  if (req.body.hasOwnProperty('vakantie')) {
    query.vakantie = req.body.vakantie
  }
  if (req.body.hasOwnProperty('betalend')) {
    query.betalend = req.body.betalend
  }
  if (req.body.hasOwnProperty('alexsammy')) {
    query.alexsammy = req.body.alexsammy
  }
  if (req.body.hasOwnProperty('samenwerkinghoreca')) {
    query.samenwerkinghoreca = req.body.samenwerkinghoreca
  }
  if (req.body.hasOwnProperty('bedrijven') && req.body.bedrijven.length > 0) {
    query.bedrijf = {
      $in: req.body.bedrijven.map((app) => { return ObjectId(app._id) })
    }
  } else {
    query.bedrijf = req.user.bedrijf;
  }  
  Logboeken.find(query).sort({
    "datum": 1
  }).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({
      results
    });
  });
};
exports.vergelijken = function (req, res, next) {
  var query = {};
  if (req.body.hasOwnProperty('datum')) {
    
    if (req.body.datum.startdate && req.body.datum.enddate) {
      query.datum = {
        "$gte": moment(req.body.datum.startdate).toISOString(),
        "$lte": moment(req.body.datum.enddate).toISOString(),
      };
    }
  } else if (req.body.hasOwnProperty('jaar')) {
    query.datum = {
      "$gte": new Date(moment(req.body.jaar + '/01/01','YYYY/MM/DD').startOf('year')),
      "$lte": new Date(moment(req.body.jaar + '/01/01','YYYY/MM/DD').endOf('year')),
    };
  }
  if (req.body.hasOwnProperty('soortactiviteit')) {
    query.soortactiviteit = req.body.soortactiviteit
  }
  if (req.body.hasOwnProperty('doelgroep')) {
    query.doelgroep = req.body.doelgroep
  }
  if (req.body.hasOwnProperty('vakantie')) {
    query.vakantie = req.body.vakantie 
  }
  if (req.body.hasOwnProperty('betalend')) {
    query.betalend = (req.body.betalend === 'true') 
  }
  if (req.body.hasOwnProperty('alexsammy')) {
    query.alexsammy = (req.body.alexsammy === 'true') 
  }
  if (req.body.hasOwnProperty('samenwerkinghoreca')) {
    query.samenwerkinghoreca = (req.body.samenwerkinghoreca === 'true') 
  }
 
  Logboeken.aggregate([
    {$match: query },
    {
      $group: {
        _id: {
          bedrijf: "$bedrijf",
          doelgroep: "$doelgroep",
        },
        "totaal": {
          $sum: 1
        },
        "hulpkrachten": {
          $sum: "$hulpkrachten"
        },
        "recreatieleider": {
          $sum: "$recreatieleider"
        },
        "stagiaires": {
          $sum: "$stagiaires"
        },
        "activiteiten": {
          $sum: 1
        },
        "deelnemers": {
          $sum: "$deelnemers"
        },
        soortactiviteit : {
          "$push": {
            soortactiviteit:"$soortactiviteit",
            total:"$totaal"
          }
      },
      }
    },
    {
      $group : {
        _id : '$_id.bedrijf',
        doelgroep : {
          "$push": {
            doelgroep:"$_id.doelgroep",
            total:"$totaal"
          }
      },
      soortactiviteit : {
        "$push": {
          soortactiviteit:"$_id.soortactiviteit",
          total:"$totaal"
        }
    },
    "totaal": {
      $sum: "$totaal"
    },
      "hulpkrachten": {
        $sum: "$hulpkrachten"
      },
      "recreatieleider": {
        $sum: "$recreatieleider"
      },
      "stagiaires": {
        $sum: "$stagiaires"
      },
      "activiteiten": {
        $sum: "$activiteiten"
      },
      "deelnemers": {
        $sum: "$deelnemers"
      }
      }
    },
    {
      $lookup: {
        from: "bedrijvens", 
        localField: "_id", 
        foreignField: "_id", 
        as: "bedrijf"
      }
  }
  ]).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({
      results
    });
  });
};
exports.counts = function (req, res, next) {
  var query = {};  
  query.bedrijf = req.user.bedrijf;
  query.datum = {
    "$gte": moment().startOf('year').toDate(),
    "$lte": moment().endOf('year').toDate(),
  };
  Logboeken.aggregate([{
    $match: query,
  }, {
    $group: {
      _id: null,
      deelnemers: {
        $sum: "$deelnemers"
      },
      hulpkrachten: {
        $sum: "$hulpkrachten"
      },
      stagiaires: {
        $sum: "$stagiaires"
      },
      recreatieleider: {
        $sum: "$recreatieleider"
      },
      totaal: {
        $sum: 1
      }
    }
  }]).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({
      results
    });
  });
}
exports.deelnemers = function (req, res, next) {
  Logboeken.aggregate([{
    $match: {
      "bedrijf": req.user.bedrijf
    },
  }, {
    $group: {
      _id: {
        year: {
          $year: "$datum"
        },
        month: {
          '$month': "$datum"
        },
        dag: {
          '$dayOfMonth': "$datum"
        }
      },
      deelnemers: {
        $sum: "$deelnemers"
      }
    }
  }, {
    $sort: {
      datum: -1
    }
  }]).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({
      results
    });
  });
}
exports.progress = function (req, res, next) {
  Website.count({
    verwerkt: false,
    bedrijf: req.user.bedrijf,
    datum: {
      "$lte": moment().toDate()
    }
  }, (err, results) => {
    Logboeken.count({
      bedrijf: req.user.bedrijf,
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      results = { website: results, logboek: result }
      res.json({
        results
      });
    });
  })
}
