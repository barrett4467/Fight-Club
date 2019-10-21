// load bcrypt
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;

  // used to serialize the user
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // signup functionality
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(
            password,
            bCrypt.genSaltSync(process.env.SALT_NUM),
            null
          );
        };

        User.findOne({ where: { email: email } }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "Email address already in use"
            });
          } else if (password !== req.body.password2) {
            return done(null, false, { message: "Password do not match" });
          } else {
            var userPassword = generateHash(password);
            var data = {
              email: email,
              password: userPassword
            };

            User.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  // login functionality
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // (by default, localStrategy uses username and password; we're overriding with email)
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var User = user;
        var isValidPassword = function(password, userpw) {
          return bCrypt.compareSync(password, userpw);
        };

        User.findOne({ where: { email: email } })
          .then(function(user) {
            if (!user) {
              return done(null, false, { message: "No matching email" });
            }

            if (!isValidPassword(password, user.password)) {
              return done(null, false, { message: "Incorrect password" });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            return done(null, false, {
              message: "Something went wrong with your login"
            });
          });
      }
    )
  );
};
