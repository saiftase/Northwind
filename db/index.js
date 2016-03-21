var Promise = require('bluebird');
var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  priority: {type: Number, default: 5}
});

var Item = mongoose.model('item', itemSchema);

var models = {
  Item: Item,
};

var _conn;

function connect(){
  if(_conn)
    return _conn;
  _conn = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN, function(){
      resolve(mongoose.connection);
    });
  });
  return _conn;
}

function disconnect(){
  return new Promise(function(resolve, reject){
    mongoose.disconnect(function(){
      _conn = null;
      resolve();
    });
  });
}

module.exports = {
  models: models,
  connect: connect,
  disconnect: disconnect
};