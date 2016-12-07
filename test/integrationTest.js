const request = require('supertest');

const app = require('../app');

describe('GET /trailers/:trailer', () => {
  describe('when the movie exists', () => {
    it('returns a trailer', (done) => {
      const viaplayUrl = 'https://content.viaplay.se/pc-se/film/ted-2-2015';

      request(app)
      .get('/trailers')
      .query({q: viaplayUrl})
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  describe('when the movie does not exist', () => {
    it('returns a 404', (done) => {
      const viaplayurl = 'https://content.viaplay.se/pc-se/film/luis-carlos-test-2016';

      request(app)
      .get('/trailers')
      .query({q: viaplayurl})
      .expect('content-type', /json/)
      .expect(400, done);
    });
  });

  describe('when there are A LOT of parallel requests', () => {
    it('handles them gracefully', (done) => {
      done();
    });
  });
});

