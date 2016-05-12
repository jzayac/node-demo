'use strict';

const express = require('express');
const passport = require('passport');
let router = express.Router();

router.get('/login', (req, res) => {
  res.json({
    router: 'login',
  });
});

router.get('/loadauth', (req, res) => {
  res.json({
    data: req.user || null,
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (info) {
      return res.status(info.status).json({message: info.error});
    }
    if (! user) {
      return res.status(401).json({ success: false, message: 'authentication failed' });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      res.json({
        success: true,
        data: {
          email: user.email,
        }
      });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'ok',
  });
});

router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (info) {
      return res.status(info.status).json({message: info.error});
    }
    if (!user) {
      return res.status(401).json({ success: false, message: 'registration failed' });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      res.json({
        success: true,
        data: {
          email: user.email,
        }
      });
    });
  })(req, res, next);
});

router.get('/user', isAuthenticated, (req, res) => {
  res.status(200).json({
    data: 'send from server',
  });
});


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({ error: 'Unauthorized'});
}


module.exports = router;
