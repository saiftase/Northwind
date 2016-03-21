var db = require('../db');
var models = db.models;
var Item = models.Item;

var item = {name: "New Item", priority: 2};

module.exports = function(){
  return db.connect()
    .then(function(){
      return Item.remove();
    })
    .then(function(){
      return Item.create(item);
    }).then(function(createdItem){
      console.log(createdItem);
    })
};
