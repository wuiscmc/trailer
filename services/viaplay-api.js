const request = require('superagent');

class ViaplayAPI {
  fetch (movieUrl, cb) {
    if (!movieUrl) {
      return cb(new Error("not a movie id"), null)
    };

    request
    .get(movieUrl)
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
