'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    User.findOne({ email:  email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (user) {
        return done({ signupMessage: 'That email is already taken.' }, false);
      } else {
        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.authorized = false;

        newUser.save((error) => {
          if (error) {
            throw error;
          } else {
            // res.session.user = newUser;
            return done(null, newUser);
          }
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => { // callback with email and password from our form
    User.findOne({ email:  email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done({ status: 401, loginMessage: 'No user found.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { loginMessage: 'Oops! Wrong password.' });
      }

      req.session.user = {
        id: user._id,
        email: user.email,
      };
      return done(null, user);
    });
  }));
};
