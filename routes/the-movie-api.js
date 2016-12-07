const request = require('superagent');
const Throttle = require('superagent-throttle');

class TheMovieDBAPI {
  constructor(api_key) {
    this.api_key = api_key;
    this.throttle = new Throttle({
      active: true,
      rate: 40,
      ratePer: 10000,
      concurrent: 20,
    });
  }

  fetchVideo(videoId, cb) {
    if(!videoId) {
      return cb(new Error("not a video id"), null);
    }

    const endpoint = `https://api.themoviedb.org/3/movie/${videoId}/videos`;

    request
    .get(endpoint)
    .query({api_key: this.api_key, language: 'en-US', external_source: 'imdb_id'})
    .set('Accept', 'application/json')
    .use(this.throttle.plugin(endpoint))
    .end((err, res) => {
      if(err) {
        cb(err, res);
      } else {
        cb(err, res.body);
      }
    });
  }
}


// var viaplay = new ViaplayAPI();
// var trailers = new TheMovieAPI(token);

// viaplayAPI.call(url, (err, res) => {
//   if (err) { throw err; }

//   trailers.call(res.imdbId, (err, res) => {
//     if (err) { throw err; }
//     var linkBuilder = new LinkBuilder();

//     return linkBuilder(res.body);
//   });
// });



module.exports = TheMovieDBAPI;
