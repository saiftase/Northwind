var router = require('express').Router();
var Promise = require('bluebird');

var models = require('../../db').models;
var Item = models.Item;

//Get all items
router.get("/", function(req, res, next){
	res.send("API Success");
});

router.delete("/:id", function(req, res, next){
	
})

module.exports = router;