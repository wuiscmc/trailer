const request = require('superagent');
const expect = require('chai').expect;

const app = require('../app');
const ViaplayAPI = require('../routes/viaplayApi');

const config = require('./superagentMocks');

describe('ViaplayAPI', () => {
  let superagentMocks;
  const viaplayApi = new ViaplayAPI('https://content.viaplay.se/pc-se/film');

  before(() => {
    superagentMocks = require('superagent-mock')(request, config);
  });

  after(() => {
    superagentMocks.unset();
  });

  describe('how the movies information is fetched', () => {
    it('returns information about the movie', (done) => {
      viaplayApi.fetch('ted-2-2015', (err, res) => {
        if (err) return done(err);

        done();
      });
    });
  });

  describe('when the movie is not found', () => {
    it('returns an error', () => {
      expect(viaplayApi.fetch.bind('not-a-movie', (err, res) => {})).to.throw(Error)
    });
  });
});
