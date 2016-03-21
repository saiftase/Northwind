var router = require('express').Router();
var Promise = require('bluebird');

var models = require('../../db').models;
var Item = models.Item;

router.get("/", function(req, res, next){
	res.send("API Success");
});

module.exports = router;