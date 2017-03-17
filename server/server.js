var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.use(express.static(__dirname + '/../client'));
app.use(express.static('client'));

app.use(bodyParser.json());

require('./config/routes.js')(app, express);


var port = process.env.PORT || 3000;
app.listen(port);
console.log("Running on port" + "dirname is: " + __dirname + "port: " + port);

module.exports = app;