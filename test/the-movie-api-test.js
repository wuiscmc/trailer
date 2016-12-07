const request = require('superagent');
const expect = require('chai').expect;

const app = require('../app');
const TheMovieDBAPI = require('../routes/the-movie-api');

const config = require('./superagentMocks');

describe('TheMovieDBAPI', () => {
  let superagentMocks;
  const theMovieDBAPI = new TheMovieDBAPI('not-a-token');

  before(() => {
    superagentMocks = require('superagent-mock')(request, config);
  });

  after(() => {
    superagentMocks.unset();
  });

  describe('how the trailer information is fetched', () => {
    it('returns information about the trailer', (done) => {
      theMovieDBAPI.fetchVideo('tt2637276', (err, res) => {
        if (err) return done(err);

        done();
      });
    });
  });

  describe('when the movie is not found', () => {
    it('returns an error', () => {
      expect(theMovieDBAPI.fetchVideo.bind('not-a-movie', (err, res) => {})).to.throw(Error)
    });
  });
});
