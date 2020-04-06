const Events = require("../models/events");
var moment = require('moment');
var _this = this;
exports.updatedateevent = function() {
  Events.find({
    "event.einddatum": {
      $gte: moment().endOf('day').toDate()
    }
  }).exec(function(err, items) {
    if (err) {
      console.log(err);
    }
      items.forEach(function(element) {
    _this.zoekdagen(element)
      });
    });
  }

  exports.zoekdagen = function(element) {
    var dag = moment().day();
    var watishet = ''
      var datum,
        optellen,
        tel;
    element.when.datepatterns[0][0].days.forEach(function(data) {
      if (data.day == dag && watishet == '') {
        watishet = 1;
      }
    });
    element.when.datepatterns[0][0].days.forEach(function(data) {
      if (data.day > dag && watishet == '') {
        watishet = 2;
        tel = data.day;
      }
    });
    element.when.datepatterns[0][0].days.forEach(function(data) {
      if (data.day < dag && watishet == '') {
        watishet = 3;
        tel = data.day;
      }
    });
    if (watishet == 1) {
      datum = moment().toDate()
    } else if (watishet == 2) {
      optellen = parseInt(tel - dag) + parseInt(dag);
      datum = moment().add(optellen, 'days').toDate()
    } else if (watishet == 3) {
      optellen = parseInt(7 - dag) + parseInt(tel)
      datum = moment().add(optellen, 'days').toDate()
    }

    if (element.event.startdatum) {
      var startdatum = element.event.startdatum
    } else {
      var startdatum = element.event.datum
    }

    Events.update({
      _id: element._id
    }, {
      "event.datum": datum,
      "event.startdatum": startdatum
    }, function(err, doc) {
      return doc;
    });
  }
