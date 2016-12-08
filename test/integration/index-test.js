const request = require('supertest');

const app = require('../../app');

describe('GET /trailers/:trailer', () => {
  describe('when the movie exists', () => {
    it('returns a trailer', (done) => {
      request(app)
      .get('/trailers')
      .query({ url: 'https://content.viaplay.se/pc-se/film/ted-2-2015' })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  describe('when the movie does not exist', () => {
    it('returns a 404', (done) => {
      request(app)
      .get('/trailers')
      .query({ url: 'https://content.viaplay.se/pc-se/film/not-a-movie-2915' })
      .expect('content-type', /json/)
      .expect(400, done);
    });
  });
});

