const rp = require('request-promise');
const cheerio = require('cheerio');
var moment = require('moment');
moment.locale('nl')
const Bedrijven = require('../models/bedrijf');
const Webiste = require('../models/website')
exports.scanwebsite = function() {
  Bedrijven.find({}).exec() // 1
    .then(groups => {
      return Promise.all(groups.map(group => {
        if (group.website) {
          const options = {
            uri: group.website,
            transform: function(body) {
              return cheerio.load(body);
            }
          };
          rp(options).then(($) => {
            $('.recreationItem').each(function(i, elem) {
              var query = {
                  datum: moment($(this).find('.date').text(),'D MMMM').add(2, 'hours').toISOString(),
                  activiteit: $(this).find('.title').text(),
                  bedrijf: group._id
                },
                update = {
                  datum: moment($(this).find('.date').text(),'D MMMM').add(2, 'hours').toISOString(),
                  activiteit: $(this).find('.title').text(),
                  tijd: $(this).find('.start').text(),
                  beschrijving: $(this).find('.text').text(),
                  bedrijf: group._id
                },
                options = {
                  upsert: true,
                  new: true,
                  setDefaultsOnInsert: true
                };
              // Find the document
              Webiste.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) {
                console.log(error);
              }
              })
              return true
            });
          }).catch((err) => {
            console.log(err);
          });
        } else {
          return
        }
      })).then(propGroups => {

      });
    })
}
