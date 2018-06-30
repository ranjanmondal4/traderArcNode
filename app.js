var express = require('express');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;
var environment = require('./configuration/environment');
var mongoose = require('mongoose');
var controller = require('./controller/index.controller');
var authentication = require('./auth/authentication');
var app = express();

// use complex algo for nested objs parsing if true otherwise can't parse.
app.use(bodyParser.urlencoded({ extended: true }));
// now parse json data too.
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/' + environment.database, function (err) {
    if (err) throw err;
    console.log('Successfully connected To Database : ' + environment.database);
});

app.use(authentication.authenticateRequest);
// passes requests to controller.
app.use(controller);

app.listen(environment.port, () => {
    console.log('Listening on port : ' + environment.port);
});