const request = require('superagent');
const expect = require('chai').expect;

const TrailerService = require('../../services/trailer-service');

const config = require('../support/superagent-mocks');

describe('TrailerService', () => {
  let superagentMocks;
  const trailerService = new TrailerService();

  before(() => {
    superagentMocks = require('superagent-mock')(request, config);
  });

  after(() => {
    superagentMocks.unset();
  });

  it('returns a link to a trailer', (done) => {
    trailerService.fetchTrailer('ted-2-2015', (err, res) => {
      if (err) return done(err);

      expect(res.site).to.eq('Youtube')
      expect(res.url).to.not.be.empty;

      done();
    });
  });
});
