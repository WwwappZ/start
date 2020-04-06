const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const localOptions = {
  usernameField: "email",
  passReqToCallback: true,
  failWithError: true
};

const localLogin = new LocalStrategy(localOptions, function(
  req,
  email,
  password,
  done
) {
  User.findOne(
    {
      email: email
    },
    function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(
          null,
          {},
          {
            error: "true",
            message: 'geen gebruiker gevonden met dit emailadres'
          }
        );
      }

      // compare passwords - is `password` equal to user.password?
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(
            null,
            {},
            { error: "isMatch", message: "Het wachtwoord is niet correct" }
          );
        }
        console.log(user.blocked);
        
        if (!user.isVerified) {
          return done(null, user, { error: "notValide", message: "notValide" });
        }
        if (!user.SmsAuth) {
          return done(null, user, { error: "SmsAuth", message: "SmsAuth" });
        }
        if (user.blocked) {
          return done(null, user, { error: "Blocked", message: "Blocked" });
        }
        return done(null, user, { error: false, message: "Succesvol ingelogd" });
      });
    }
  );
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
  expiresIn: config.expiresIn
};
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user && user.blocked==false) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
