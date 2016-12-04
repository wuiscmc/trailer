var assert = require('assert');
var request = require('supertest');
var app = require('../app');
var expect = require('chai').expect

var hola = require('../routes/trailer_service');

describe('GET /trailers', function() {
  it('returns nothing', function(done) {
    request(app)
      .get('/trailers')
      .expect('Content-Type', /json/)
      .expect(200, [], done)
  });
});

describe('GET /trailers/:trailer', function() {
  it('returns a trailer', function(done) {
    var link = 'https://content.viaplay.se/pc-se/film/ted-2-2015'
    request(app)
    .get('/trailers')
    .query({q: link})
    .expect('Content-Type', /json/)
    .expect(200, done)
  });
});


