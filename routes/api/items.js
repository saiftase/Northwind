var router = require('express').Router();
var Promise = require('bluebird');

var models = require('../../db').models;
var Item = models.Item;

//Get all items
router.get("/", function(req, res, next){
	Item.find().sort("priority")
	.then(function(items){
		res.send(items);
	});
});

//Add an item
router.post("/", function(req, res, next){
	Item.create({
		name: req.body.name,
		priority: req.body.priority
	})
	.then(function(item){
		res.send(item);
	})
})

//Remove a specific item
router.delete("/:id", function(req, res, next){
	Item.remove({
		_id: req.params.id
	})
	.then(function(days){
		res.sendStatus(204);
	})
})

//Update priority of a specific item
router.put("/:id/priority/:priority", function(req, res, next){
	Item.findById(req.params.id)
	.then(function(item){
		item.priority = req.params.priority;
		return item.save();
	})
	.then(function(item){
		res.send(item);
	})
})

module.exports = router;