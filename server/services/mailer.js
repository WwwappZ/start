var nodemailer = require("nodemailer");
const config = require('../config');
exports.send = function send(subject, text, email) {
  var transporter = nodemailer.createTransport(
   config.email.account
  );
  var mailOptions = {
    from: config.email.from,
    to: email,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      return res.status(500).send({
        msg: err.message
      });
    }
    return res.status(200).send({
      msg: 'Er is een email gestuurd naar ' + existingUser.email + ' om een nieuw wachtwoord aan te maken.'
    });
  });
}
exports.verzenden = function(user, subject, text, msg) {
return new Promise(function(resolve, reject) {
  var transporter = nodemailer.createTransport( config.email.account);
  var mailOptions = {
    from: config.email.from,
    to: user.email,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      reject({
        msg: err.message
      })
    }
    resolve({
      msg: msg
    });
  });
});
}
