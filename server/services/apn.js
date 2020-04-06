const apn = require('apn');

module.exports = function(devices, title, messages, data) {
  let service = new apn.Provider({
    cert: __dirname + '/cert/cert.pem',
      key: __dirname + '/cert/key.pem',
    batchFeedback: true,
    interval: 20,
    production : true
  });

  var notification = new apn.Notification();
  notification.expiry = Math.floor(Date.now() / 1000) + 3600
  notification.sound = "ping.aiff"
  notification.alert = {"body":messages,"title":title}
  notification.badge = 1
  notification.payload = data
  notification.topic = "com.wwwappz.vvvapp";

  service.send(notification, devices).then( result => {
      console.log("failed:", result.failed.length);
      console.log(result.failed);
  });

  service.shutdown();
}
