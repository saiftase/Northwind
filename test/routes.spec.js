var request = require('supertest-as-promised')(require('../app'));
var expect = require('chai').expect;
var db = require('../db');
var seed = require('./seed');

describe('Routes', function(){
  before(function(done){
    seed()
      .then(function(){
        done();
      });
  });

  describe('/', function(){
    it('returns the home page', function(){
      return request.get('/')
        .expect(200)
        .then(function(res){
          expect(res.text).to.contain('Home Page');
        });
    });
  
  });

});
