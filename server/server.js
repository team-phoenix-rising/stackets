var express = require('express');
var bodyParser = require('body-parser');

//initialize express
var app = express();

//make index.html the page we auto-direct to
app.use(express.static('client'));

//include bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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