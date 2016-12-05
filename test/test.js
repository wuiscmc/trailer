const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect

describe('GET /trailers/:trailer', () => {
  it('returns a trailer', (done) => {
    const viaplayUrl = 'https://content.viaplay.se/pc-se/film/ted-2-2015';

    request(app)
    .get('/trailers')
    .query({q: viaplayUrl})
    .expect('Content-Type', /json/)
    .expect(200, done)
  });
});

