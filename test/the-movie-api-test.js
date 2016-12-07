const request = require('superagent');
const expect = require('chai').expect;

const app = require('../app');
const TheMovieDBAPI = require('../routes/the-movie-api');

const config = require('./superagent-mocks');

describe('TheMovieDBAPI', () => {
  let superagentMocks;
  const theMovieDBAPI = new TheMovieDBAPI();

  before(() => {
    superagentMocks = require('superagent-mock')(request, config);
  });

  after(() => {
    superagentMocks.unset();
  });

  describe('when the trailer exists', () => {
    it('returns information about it', (done) => {
      theMovieDBAPI.fetchVideo('tt2637276', (err, res) => {
        if (err) return done(err);

        expect(res).to.not.be.empty;
        expect(res.id).to.equal(214756);
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
