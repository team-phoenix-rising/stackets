var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.use(express.static(__dirname + '/../client'));
app.use(express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./config/routes.js')(app, express);


var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log("Running on port: " + port);

var closeServer = function() {
  console.log('closed server');
  server.close();
};

module.exports = {
  app: app,
  closeServer: closeServer
};