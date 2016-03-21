// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js 

var Promise = require('bluebird');
var mongoose = require('mongoose');

var models = require('../db').models;
var Item = models.Item;

var data = {
  Item: [
    {name: "Test Item", priority: 3},
    {name: "Test Item"},
    {name: "Test Item", priority: 10}
  ]
};

if(!process.env.CONN)
  throw new Error('no connection string supplied');

mongoose.connect(process.env.CONN, function(){
  mongoose.connection.db.dropDatabase(function() {

    //console.log("Dropped old data, now inserting data");
    Promise.map(Object.keys(data), function(modelName) {
      return Promise.map(data[modelName], function(item) {
        return models[modelName].create(item)
          .then(function(item){
            console.log(modelName, item);
          });
      });
    }).then(function() {
      console.log("Finished inserting data");
    }, console.log).then(function() {
      mongoose.connection.close(function(){
        console.log('mongoose connection has been closed');
      });
    });

  });
});
