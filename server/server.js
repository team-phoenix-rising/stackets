require('../env.js')
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return'
  }, function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function() {
      console.log('faceToken', accessToken, 'profile: ', profile);
    })
}));

//initialize express
var app = express();
app.use(passport.initialize());
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
