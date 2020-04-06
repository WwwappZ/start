const jwt = require("jwt-simple");
var crypto = require("crypto");
var TMClient = require("textmagic-rest-client");
const User = require("../models/user");
const config = require("../config");
const Token = require("../models/tokens");
const SmsAuth = require("../models/smsauth");
const verzenden = require("../services/mailer");
var c = new TMClient(config.TMClient.username, config.TMClient.key);

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
      role: user.role
    },
    config.secret
  );
}
exports.signin = function(req, res, next) { 
  if (req.authInfo.error) {
    if (req.authInfo.error == "SmsAuth") {
      var sms = new SmsAuth({
        _userId: req.user._id,
        telefoonnummer: req.user.telefoonnummer,
        token: crypto.randomBytes(16).toString("hex"),
        smscode: Math.floor(100000 + Math.random() * 900000)
      });
      sms.save(function(err) {
        if (err) {
          return res.status(500).send({
            msg: err.message
          });
        } else {
          c.Messages.send(
            {
              text:
                "Je eenmailige code voor " +
                config.domain +
                " is: " +
                sms.smscode,
              phones: sms.telefoonnummer
            },
            function(err, result) {
              res.send({
                token: sms.token,
                check: "sms",
                msg:
                  "Account needs to be checked. We will send you an sms code."
              });
            }
          );
        }
      });
    } else if (req.authInfo.error == "notValide") {
      res.statusMessage =
        "Je account is niet geactiveerd. Controleer je mailbox";
      return res.send({
        statusMessage: "Je account is niet geactiveerd. Controleer je mailbox",
        check: "email",
        email: req.user.email
      });
    } else if (req.authInfo.error == "Blocked") {
      res.statusMessage =
        "Je account is geblockeerd";
      return res.send({
        statusMessage: "Je account is geblockeerd. Neem contact op met de hoofdbeheerder",
        check: "blocked",
        email: req.user.email
      });
    } else {
      res.statusMessage = req.authInfo.message;
      return res.status(400).end();
    }
  } else {
    res.send({
      user: req.user,
      token: tokenForUser(req.user),
      check: false
    });
  }
};
exports.user = function(req, res, next) {
  // User has been authenticated, send back token
  res.send({
    user: req.user
  });
};
exports.users = function(req, res, next) {
  User.find({}).exec(function(err, results) {
    if (err) {
      return next(err);
    }
    res.json({
      results
    });
  });
};
exports.signup = function(req, res, next) {
  const {
    email,
    password,
    achternaam,
    voornaam,
    telefoonnummer,
    bedrijf,
    role
  } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      error: "Vul alle gegevens in om een account te maken"
    });
  }
  // See if a user with the given email exists
  User.findOne(
    {
      email: email
    },
    function(err, existingUser) {
      if (err) {
        return next(err);
      }
      // If a user with email does exist, return an error
      if (existingUser) {
        res.statusMessage = "Het e-mailadres is al in gebruik.";
        return res.status(422).send({
          error: "Het e-mailadres is al in gebruik."
        });
      }
      if (!bedrijf) {
        bedrijf = "user";
      }
      if (!role) {
        bedrijf = req.user.bedrijf;
      }
      const user = new User({
        email: email,
        password: password,
        role: role,
        voornaam: voornaam,
        achternaam: achternaam,
        telefoonnummer: telefoonnummer,
        bedrijf: bedrijf
      });
      user.save(function(err) {
        if (err) {
          return next(err);
        }
        var token = new Token({
          _userId: user._id,
          token: crypto.randomBytes(16).toString("hex")
        });
        // Save the verification token
        token.save(function(err) {
          if (err) {
            return res.status(500).send({
              msg: err.message
            });
          }
          // Send the email

          verzenden
            .verzenden(
              user,
              "Activeer je account",
              "Hallo " +
                voornaam +
                ",\n\n" +
                "Je hebt een account aangemaakt via " +
                config.domain +
                ". Om je account te activieren moet je op de onderstaande link klikken: \n" +
                config.domain +
                "/signup/verify/" +
                token.token +
                ".\n\n" +
                " Met vriendelijke groet, \n\n" +
                " Recraplan",
              "Er is een email gestuurd naar " +
                user.email +
                " om je account te activeren."
            )
            .then(
              data => {
                return res.status(200).send(data);
              },
              reason => {
                return res.status(422).send({
                  error: reason
                });
              }
            );
        });
        // Repond to request indicating the user was created
        //res.json({token: tokenForUser(user)});
      });
    }
  );
};
exports.forget = function(req, res, next) {
  const email = req.body.email;  
  if (!email) {
    res.statusMessage = "Vul alle gegevens in om een account te maken";
    return res.status(422).send({
      error: "Vul alle gegevens in om een account te maken"
    });
  }
  // See if a user with the given email exists
  User.findOne(
    {
      email: email
    },
    function(err, existingUser) {
      if (err) {
        return next(err);
      }
      // If a user with email does exist, return an error
      if (!existingUser) {
        res.statusMessage = "Het e-mailadres is niet in gebruik.";
        return res.status(422).send({
          error: "Het e-mailadres is niet in gebruik."
        });
      }
      var token = new Token({
        _userId: existingUser._id,
        token: crypto.randomBytes(16).toString("hex")
      });
      // Save the verification token
      token.save(function(err) {
        if (err) {
          return res.status(500).send({
            msg: err.message
          });
        }
        // Send the email
        verzenden
          .verzenden(
            existingUser,
            "Wachtwoord vergeten van je account",
            "Hallo " +
              existingUser.voornaam +
              ",\n\n" +
              "Je hebt aangeven dat je het wachtwoord van je account bent vergeten. Hierbij sturen wij je een link om je wachtwoord opnieuw aan te maken: \n" +
              config.domain +
              "/login/forget/" +
              token.token +
              ".\n\n" +
              " Met vriendelije groet, \n\n" +
              config.naam,
            "Er is een email gestuurd naar " +
              existingUser.email +
              " om een nieuw wachtwoord aan te maken."
          )
          .then(data => {
            return res.status(200).send(data);
          });
      });
    }
  );
};
exports.confirmationPost = function(req, res, next) {
  Token.findOne(
    {
      token: req.params.code
    },
    function(err, token) {
      if (!token) {
        res.statusMessage =
          "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen";
        return res.status(400).send({
          type: "not-verified",
          msg:
            "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen"
        });
      }
      // If we found a token, find a matching user
      User.findOne(
        {
          _id: token._userId
        },
        function(err, user) {
          if (!user) {
            res.statusMessage =
              "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen";
            return res.status(400).send({
              msg: "We geen gebruiker gevonden met deze code"
            });
          }
          if (user.isVerified) {
            res.statusMessage =
              "De gebruiker heeft zijn account al geactivieerd";
            return res.status(400).send({
              type: "already-verified",
              msg: "De gebruiker heeft zijn account al geactivieerd"
            });
          }
          // Verify and save the user
          user.isVerified = true;
          user.save(function(err) {
            if (err) {
              return res.status(500).send({
                msg: err.message
              });
            }
            res.status(200).send({
              msg:
                "Je account is succesvol geactiveerd. Je wordt nu doorverwezen naar het inlogscherm"
            });
          });
        }
      );
    }
  );
};
exports.confirmationSms = function(req, res, next) {
  const token = req.body.token;
  const smscode = req.body.smscode;
  if (!token || !smscode) {
    return res.status(422).send({
      error: "Vul alle gegevens in om je account te controleren"
    });
  }
  SmsAuth.findOne(
    {
      token: token,
      smscode: smscode
    },
    function(err, token) {
      if (!token) {
        res.statusMessage = "De code van sms is niet correct ingevuld";
        return res.status(400).send({
          type: "not-verified",
          msg: "De code van de sms is niet correct ingevuld"
        });
      }
      // If we found a token, find a matching user
      User.findOne(
        {
          _id: token._userId
        },
        function(err, user) {
          if (!user) {
            res.statusMessage =
              "We hebben geen gebruiker gevonden met deze code.";
            return res.status(400).send({
              msg: "We hebben geen gebruiker gevonden met deze code."
            });
          }
          if (user.SmsAuth) {
            res.statusMessage =
              "De gebruiker heeft zijn account al geactivieerd via de sms code";
            return res.status(400).send({
              type: "already-verified",
              msg:
                "De gebruiker heeft zijn account al geactivieerd via de sms code"
            });
          }
          // Verify and save the user
          user.SmsAuth = true;
          user.save(function(err) {
            if (err) {
              return res.status(500).send({
                msg: err.message
              });
            }
            res.send({
              user: user,
              token: tokenForUser(user),
              msg:
                "Je account is succesvol geactiveerd. Je wordt nu doorverwezen"
            });
          });
        }
      );
    }
  );
};
exports.admin_activation = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({
      error: "Je moet een gebruikersmaam en wachtwoord invullen"
    });
  }
  // See if an user with the given email exists
  User.findOne(
    {
      email: email
    },
    function(err, existingUser) {
      if (err) {
        return next(err);
      }
      // If an user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({
          error: "Het e-mailadres is al in gebruik"
        });
      }
      // If a user with email does NOT exist, create and save record for admin
      const user = new User({
        email: email,
        password: password,
        role: "admin"
      });
      user.save(function(err) {
        if (err) {
          return next(err);
        }
        // Repond to request indicating the admin was created
        // res.send({});
      });
    }
  );
};
exports.updateNewPassword = function(req, res, next) {
  const password = req.body.password;
  const code = req.body.code;
  if (!password || !code) {
    res.statusMessage = "Vul alle gegevens in om een account te maken";
    return res.status(422).send({
      error: "Vul alle gegevens in om een account te maken"
    });
  }
  Token.findOne(
    {
      token: code
    },
    function(err, token) {
      if (!token) {
        res.statusMessage =
          "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen";
        return res.status(400).send({
          type: "not-verified",
          msg:
            "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen"
        });
      }
      // If we found a token, find a matching user
      User.findOne(
        {
          _id: token._userId
        },
        function(err, user) {
          if (!user) {
            res.statusMessage =
              "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen";
            return res.status(400).send({
              msg:
                "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen"
            });
          }
          // Verify and save the user
          user.password = password;
          user.UpdatePass = true;
          user.SmsAuth = false;
          user.save(function(err) {
            if (err) {
              return res.status(500).send({
                msg: err.message
              });
            }
            return res.status(200).send({
              msg:
                "Je wachtwoord is met succes gewijzigd. Login om verder te gaan"
            });
          });
        }
      );
    }
  );
};

exports.updateNewPasswordLogin = function(req, res, next) {
  const password = req.body.password;
  const code = req.body.code;
  if (!password) {
    res.statusMessage = "Vul alle gegevens in om een account te maken";
    return res.status(422).send({
      error: "Vul alle gegevens in om een account te maken"
    });
  }
  User.findOne(
    {
      _id: req.user._id
    },
    function(err, user) {
      if (!user) {
        res.statusMessage =
          "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen";
        return res.status(400).send({
          msg:
            "We hebben de code niet gevonden. Het kan zijn dat de code niet klopt of dat hij is verlopen"
        });
      }
      // Verify and save the user
      user.password = password;
      user.UpdatePass = true;
      user.save(function(err) {
        if (err) {
          return res.status(500).send({
            msg: err.message
          });
        }
        return res.status(200).send({
          msg: "Je wachtwoord is met succes gewijzigd. Login om verder te gaan"
        });
      });
    }
  );
};
exports.update = function(req, res, next) {
  const { voornaam, achternaam, woonplaats, email, _id } = req.body;
  User.findOneAndUpdate(
    {
      _id: _id
    },
    {
      voornaam,
      achternaam,
      woonplaats,
      email
    },
    (err, results) => {
      if (err) {
        res.status(500).json({
          errors: {
            global: "Something went wrong"
          }
        });
      } else {
        res.send({
          user: results,
          token: tokenForUser(results)
        });
      }
    }
  );
};
exports.sendvmail = function(req, res, next) {
  const email = req.body.email;
  User.findOne(
    {
      email: email
    },
    function(err, user) {
      if (user._id) {
        var token = new Token({
          _userId: user._id,
          token: crypto.randomBytes(16).toString("hex")
        });
        // Save the verification token
        token.save(function(err) {
          if (err) {
            return res.status(500).send({
              msg: err.message
            });
          }
          // Send the email
          verzenden
            .verzenden(
              user,
              "Activeer je account",
              "Hallo ,\n\n" +
                "Je hebt een account aangemaakt via " +
                config.domain +
                ". Om je account te activieren moet je op de onderstaande link klikken: \n" +
                config.domain +
                "/signup/verify/" +
                token.token +
                ".\n\n" +
                " Met vriendelije groet, \n\n" +
                config.naam,
              "Er is een email gestuurd naar " +
                user.email +
                " om je account te activeren."
            )
            .then(data => {
              return res.status(200).send(data);
            });
        });
      }
    }
  );
};
