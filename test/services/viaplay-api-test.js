const request = require('superagent');
const expect = require('chai').expect;

const ViaplayAPI = require('../../services/viaplay-api');

const config = require('../support/superagent-mocks');

describe('ViaplayAPI', () => {
  let superagentMocks;
  const viaplayApi = new ViaplayAPI();

  before(() => {
    superagentMocks = require('superagent-mock')(request, config);
  });

  after(() => {
    superagentMocks.unset();
  });

  describe('how the movies information is fetched', () => {
    it('returns information about the movie', (done) => {
      viaplayApi.fetch('https://content.viaplay.se/pc-se/film/ted-2-2015', (err, res) => {
        expect(err).to.not.exist;
        expect(res).to.not.be.empty;
        done();
      });
    });
  });

  describe('when the movie is not found', () => {
    it('returns an error', (done) => {
      viaplayApi.fetch(null, (err, res) => {
        expect(err).to.exist;
        done();
      })
    });
  });
});
