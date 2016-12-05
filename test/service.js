const assert = require('assert');
const app = require('../app');
const expect = require('chai').expect
const request = require('superagent');
const viaplayFixture = require('./viaplayFixture');
const imdbFixture = require('./imdbFixture');

const fetchTrailer = require('../routes/trailer_service');

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

  it('does stuff', (done) => {
    fetchTrailer('https://content.viaplay.se/pc-se/film/ted-2-2015', (err, res) => {
      if (err) return done(err);
      expect(res.site).to.eq('Youtube')

      done();
    });
  });
});
