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
const Bedrijven = require('./controllers/bedrijven')
//Custom express routing middleware that checks to see if the authenticated user is an admin
const requireAdmin = require('./services/requireAdmin')
const requireTrainerAdmin = require('./services/requireTrainigAdmin')
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
 app.post('/api/admin/profile', requireAuth, Profile.update);
 app.post('/api/admin/profile/upload', requireAuth, Profile.upload);
 app.post('/api/admin/profile/changepass', requireAuth, Authentication.updateNewPasswordLogin);

app.get('/api/admin/gebruikers', requireAuth, requireAdmin, Gberuikers.fetch);
app.get('/api/admin/gebruikers/:id', requireAuth, requireAdmin, Gberuikers.get);
app.put('/api/admin/gebruikers/:id', requireAuth, requireAdmin, Gberuikers.update);

 app.post('/api/admin/bedrijven', requireAuth, requireAdmin, Bedrijven.insert);
 app.get('/api/admin/bedrijven', requireAuth, Bedrijven.fetch);
 app.get('/api/admin/bedrijven/:id', requireAuth, Bedrijven.get);
 app.post('/api/admin/bedrijven/:id', requireAuth, requireAdmin, Bedrijven.update);



  app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}
