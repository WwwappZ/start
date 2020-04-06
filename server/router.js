//Authentication route handlers
const path = require('path');
const config = require('./config');
const Authentication = require('./controllers/authentication');
//Passport middleware module and setup
const passport = require('passport');
const passportStrategies = require('./services/passport_strategies');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});
const Profile = require('./controllers/profile');
const Gberuikers = require('./controllers/gebruikers')
const Logboeken = require('./controllers/logboeken');
const Bedrijven = require('./controllers/bedrijven')
const Website = require('./controllers/website')
const Push = require('./controllers/push');
const Cursisten = require('./controllers/cursisten');
const Trainingsgroepen = require('./controllers/trainingsgroepen')
const Beoordelingen = require('./controllers/beoordelingen')
//Custom express routing middleware that checks to see if the authenticated user is an admin
const requireAdmin = require('./services/requireAdmin')
const requireTrainerAdmin = require('./services/requireTrainigAdmin')
const Certificaten = require("./controllers/certificaat")
module.exports = function(app) {
  //auth
  app.get('/api/server', function(req, res) {
    res.send({message: 'Server is online'});
  });
  app.get('/api/config', function(req, res) {
    res.send({openregist: config.openregist });
  });
  app.get('/api/protected_content', requireAuth, function(req, res) {
    res.send({message: 'server response:  this GET request has been authorized for a user'});
  });
  app.get('/api/admin_area', requireAuth, requireAdmin, function(req, res, next) {
    res.send({message: 'server response:  this GET request has been authorized for an admin'});
  });
  app.post('/api/signin/forget', Authentication.forget);
  app.post('/api/signin/sendvmail', Authentication.sendvmail);
  app.post('/api/login/forget/verification', Authentication.updateNewPassword);
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', requireAuth, requireAdmin, Authentication.signup);
  app.post('/api/update', Authentication.update);
  app.get('/api/signup/verification/:code', Authentication.confirmationPost);
  app.post('/api/signin/verification', Authentication.confirmationSms);

  app.post('/api/admin_activation', requireAuth, requireAdmin, Authentication.admin_activation);
  app.get('/api/user', requireAuth, Authentication.user);
  app.get('/api/admin/users',requireAuth, Authentication.users)
  app.get('/api/admin/profile', requireAuth, Profile.fetch);
  app.get('/api/admin/profile/push', requireAuth, Push.fetchpush);
  app.post('/api/admin/profile/push', requireAuth, Push.savepushplanning);
 app.post('/api/admin/profile', requireAuth, Profile.update);
 app.post('/api/admin/profile/upload', requireAuth, Profile.upload);
 app.post('/api/admin/profile/changepass', requireAuth, Authentication.updateNewPasswordLogin);

app.get('/api/admin/gebruikers', requireAuth, requireAdmin, Gberuikers.fetch);
app.get('/api/admin/gebruikers/:id', requireAuth, requireAdmin, Gberuikers.get);
app.put('/api/admin/gebruikers/:id', requireAuth, requireAdmin, Gberuikers.update);

app.post('/api/admin/logboeken/insert', requireAuth, Logboeken.insert);
app.post('/api/admin/logboeken', requireAuth, Logboeken.fetch);
app.get('/api/admin/logboeken/count', requireAuth, Logboeken.counts);
app.get('/api/admin/logboeken/website', requireAuth, Website.fetch);
app.get('/api/admin/logboeken/:id', requireAuth, Logboeken.get);
app.put('/api/admin/logboeken/:id', requireAuth, Logboeken.update);
app.delete('/api/admin/logboeken/:id', requireAuth, Logboeken.delete);
app.post('/api/admin/logboeken/website/verwerken', requireAuth, Website.verwerken);
app.post('/api/admin/logboeken/deelnemers', requireAuth, Logboeken.deelnemers);

app.post('/api/admin/vergelijken', requireAuth, Logboeken.vergelijken);
app.get('/api/admin/progress', requireAuth, Logboeken.progress);

 app.post('/api/admin/bedrijven', requireAuth, requireAdmin, Bedrijven.insert);
 app.get('/api/admin/bedrijven', requireAuth, Bedrijven.fetch);
 app.get('/api/admin/bedrijven/:id', requireAuth, Bedrijven.get);
 app.post('/api/admin/bedrijven/:id', requireAuth, requireAdmin, Bedrijven.update);

 app.get('/api/admin/push', requireAuth, requireAdmin, Push.fetch);
app.post('/api/admin/push', requireAuth, Push.save);
app.get('/api/admin/push/devices', requireAuth, requireAdmin, Push.devices);
//cursisten
app.post('/api/admin/trainingen/beoordelingen', requireAuth, Beoordelingen.update);
app.post('/api/admin/trainingen/cursisten', requireAuth,requireTrainerAdmin, Cursisten.insert);
app.get('/api/admin/trainingen/cursisten', requireAuth, Cursisten.fetch);
app.post('/api/admin/trainingen/certificaat', requireAuth, Certificaten.save);
app.get('/api/admin/trainingen/certificaat', requireAuth, Certificaten.fetch);
app.get('/api/admin/trainingen/cursisten/:id', requireAuth, Cursisten.get);
app.post('/api/admin/trainingen', requireAuth,requireTrainerAdmin, Trainingsgroepen.insert);
app.get('/api/admin/trainingen', requireAuth,requireTrainerAdmin, Trainingsgroepen.fetch);
app.get('/api/admin/training/:id', requireAuth,requireTrainerAdmin, Trainingsgroepen.get);
app.post('/api/admin/trainingen/:id', requireAuth,requireTrainerAdmin, Trainingsgroepen.update);
app.post('/api/admin/training/update/cursisten/:id', requireAuth,requireTrainerAdmin, Trainingsgroepen.setcuristen);
app.get('/api/admin/trainingen/cursist/:id', requireAuth, Trainingsgroepen.getcurist);
app.post('/api/admin/trainingen/cursisten/:id', requireAuth, Cursisten.update);
app.post('/api/admin/trainingen/cursist/delete/:id', requireAuth,requireTrainerAdmin, Trainingsgroepen.removecurist);
app.post('/api/admin/trainingen/cursist/upload/:id', requireAuth, Cursisten.upload);
app.post('/api/admin/trainingen/beoordelingen/cursist', requireAuth, Beoordelingen.fetchcursist);


  app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}
