var expect = require('chai').expect;
var db = require('../db');
var Item = db.models.Item;
var seed = require('./seed');

describe('models', function(){
  beforeEach(function(done){
    seed()
      .then(function(){
        done();
      });
  
  });

  describe('hotels', function(){
    var itemOne, items;
    beforeEach(function(done){
      Item.find()
        .then(function(_items){
          items = _items;
          itemOne = items[0];
          done();
        }, done);
    });

    it('Item One name is correct', function(){
      expect(itemOne.name).to.equal('New Item');
    });

    it('Item One priority is correct', function(){
      expect(itemOne.priority).to.equal(2);
    });


    describe('creating an item', function(){
      var itemTwo;
      beforeEach(function(done){
        itemTwo = new Item({
          name: 'A Second Item'
        });
        itemTwo.save()
          .then(function(){
            done();
          }, done);

      
      });

      it('can be created', function(){
        expect(itemTwo).to.be.ok;
      });
    
    });


  });
});
