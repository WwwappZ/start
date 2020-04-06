var schedule = require('node-schedule');
var moment = require("moment");
const {scanwebsite} = require('./website')
const {sendpushcron} = require('./pushMessaging')
exports.startcron = function startcron() {
  var l = schedule.scheduleJob('0 2 * * *', function() {
  scanwebsite()
  });

  var k = schedule.scheduleJob('0 10 * * *', function() {
  sendpushcron(moment().isoWeekday())
  });

}
