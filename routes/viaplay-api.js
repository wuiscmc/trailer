const request = require('superagent');

class ViaplayAPI {
  fetch (movieId, cb) {
    if (!movieId) {
      return cb(new Error("not a movie id"), null)
    };

    request
    .get(`https://content.viaplay.se/pc-se/film/${movieId}`)
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
