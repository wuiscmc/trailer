const request = require('superagent');
const expect = require('chai').expect;

const app = require('../app');
const fetchTrailer = require('../routes/trailerService');

const config = require('./superagentMocks');

describe('trailerService', () => {
  let superagentMocks;

  before(() => {
    superagentMocks = require('superagent-mock')(request, config);
  });

  after(() => {
    superagentMocks.unset();
  });

  it('returns a link to a trailer', (done) => {
    fetchTrailer('https://content.viaplay.se/pc-se/film/ted-2-2015', (err, res) => {
      if (err) return done(err);

      expect(err).to.be.empty;
      expect(res.site).to.eq('Youtube')
      expect(res.url).to.not.be.empty;

      done();
    });
  });
});
