const assert = require('assert');
const request = require('superagent');
const expect = require('chai').expect;

const app = require('../app');
const fetchTrailer = require('../routes/trailer_service');

const viaplayFixture = require('./viaplayFixture');
const imdbFixture = require('./imdbFixture');

describe('trailerService', () => {
  let viaplayMock, imdbMock;

  before(() => {
    viaplayMock = require('superagent-mock')(request, viaplayFixture);
    imdbMock = require('superagent-mock')(request, imdbFixture);
  });

  after(() => {
    viaplayMock.unset();
    imdbMock.unset();
  });

  it('returns a link to a trailer', (done) => {
    fetchTrailer('https://content.viaplay.se/pc-se/film/ted-2-2015', (err, res) => {
      if (err) return done(err);

      expect(res.site).to.eq('Youtube')
      expect(res.url).to.not.be.empty;

      done();
    });
  });
});
