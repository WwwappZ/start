const gcm = require('node-gcm');
module.exports = function startgcm(devices, title, messages) {
  return new Promise(function(resolve, reject) {
    var message = new gcm.Message({
      collapseKey: 'Recraplan',
      priority: 'high',
      contentAvailable: true,
      delayWhileIdle: true,
      timeToLive: 600,
      //dryRun: true,
      restrictedPackageName: "com.wwwappz.recraplan",
      notification: {
        title: title,
        body: messages,
        sound: 'default',
        badge: 1
      }
    });
      var sender = new gcm.Sender('AAAARhMaBjU:APA91bGYM7wqaKiMjUFS5IKmxvuQpWFfTtatGVTZ3q7KDoAFM_ET19NtgbrC-dIb-XbbmsXCx0V4nHKKWDSGv4K7VkHRf3apXekBuwuNoQCkdleI_r1a3AQ3iAdRZErtGRP15JdRNy2_');
      sender.send(message, {
      registrationTokens: devices
    }, function(err, response) {
      if (err) {
        reject(err);
      }
      else {
        resolve(response)
      };
    });
  })
}
