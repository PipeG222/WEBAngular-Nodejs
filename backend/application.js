'use strict'

var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes");
var cors =  require('cors');
var application = express();

application.use(cors());
application.use(bodyParser.urlencoded({extended: false}));
application.use(bodyParser.json());
application.use(routes);

module.exports = application;
