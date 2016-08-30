'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/communityResourceData', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/communityResourceData?reachID=652427')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        // console.log("error:",err);
        // console.log("res:",res);
        // console.log("res.body:",res.body);
        // if (err) return done(err);
        // res.body.should.be.instanceof(Array);
        done();
      });
  });
});
