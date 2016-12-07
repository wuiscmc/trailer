const request = require('superagent');

class ViaplayAPI {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetch (movieId, cb) {
    if (!movieId) {
      return cb(new Error("not a movie id"), null)
    };

    request
    .get(`${this.endpoint}/${movieId}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        cb(err, res);
      } else {
        cb(null, res.body);
      }
    });
  }
};

module.exports = ViaplayAPI;
