require('../env.js')
var db = require('./config/db.js');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['id', 'displayName', 'photos', 'email']

  }, function(accessToken, refreshToken, profile, done) {

    db.User.create({
      name: profile.displayName,
      token: accessToken,
      image: profile.photos[0].value,
      provider: profile.provider
    }).then(function(user, err) {
      return done(err, user);
    })
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//initialize express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'TopSecretWord',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

//make index.html the page we auto-direct to
app.use(express.static('client'));

//include bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
require('./config/routes.js')(app, express);
//set the port to listen on our designated PORT, otherwise listen on 3000
var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log("Running on port: " + port);

//create a function to close the server
var closeServer = function() {
  console.log('closed server');
  server.close();
};

//exports
module.exports = {
  app: app,
  closeServer: closeServer
};
