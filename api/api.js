'use strict';

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const passportConf = require('./config/passport');
const mongoose = require('mongoose');
const dbConf = require('./config/db');

const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');

const app = express();

if (dbConf.mongoose) {
  mongoose.connect(dbConf.url);
}
passportConf(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(session({
  secret: 'simple demo app',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(todoRouter);

app.get('/', (req, res) => {
  res.send('api server');
});

app.use((req, res) => {
  console.error(req.url);
  res.status(404).json({ status: 'not found' });
});

// //
app.listen(3030, () => {
  console.log('Api listening on port 3030!');
});
