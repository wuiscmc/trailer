const request = require('supertest');

const app = require('../app');

describe('GET /trailers/:trailer', () => {
  describe('when the movie exists', () => {
    it('returns a trailer', (done) => {
      request(app)
      .get('/trailers/ted-2-2015')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  describe('when the movie does not exist', () => {
    it('returns a 404', (done) => {
      request(app)
      .get('/trailers/luis-carlos-test-2016')
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

