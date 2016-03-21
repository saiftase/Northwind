var express = require('express');
var Promise = require('bluebird');
var path = require('path');
var swig = require('swig');
swig.setDefaults({ cache: false });
var bodyParser = require('body-parser');
var morgan = require('morgan');

var models = require('./db').models;

var app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

module.exports = app;

app.get('/', function(req, res, next){
  res.render("index", {
    title: "Home Page"
    });
});

app.use("/api/items", require("./routes/api/items"));

app.use(function(req, res, next){
  var error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('index', { title: 'Error', error: err });
});
