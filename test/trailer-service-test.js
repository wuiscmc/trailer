const request = require('superagent');
const expect = require('chai').expect;

const app = require('../app');
const TrailerService = require('../routes/trailer-service');

const config = require('./superagentMocks');

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
