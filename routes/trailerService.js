const request = require('superagent');
const Throttle = require('superagent-throttle');

const API_KEY = process.env.THE_MOVIE_DB_API_KEY;

const throttle = new Throttle({
  active: true,
  rate: 40,
  ratePer: 10000,
  concurrent: 20,
});

const extractImdbFromViaplayData = (payload) => {
  return payload._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb;
}

const extractLinkFromImdbData = (payload) => {
  const result = payload.results[0];

  switch(result.site){
    case 'YouTube':
      return {
        site: 'Youtube',
        url: `http://youtube.com/watch?v=${result.key}`,
      }
    default:
      return result;
  }
}

const fetchFromImdb = (imdbId, cb) => {
  const endpoint = `https://api.themoviedb.org/3/movie/${imdbId}/videos`;

  request
  .get(endpoint)
  .query({api_key: API_KEY, language: 'en-US', external_source: 'imdb_id'})
  .set('Accept', 'application/json')
  .use(throttle.plugin(endpoint))
  .end((err, res) => {
    if(err) {
      cb(err, res);
    } else {
      const data = extractLinkFromImdbData(res.body)
      cb(err, data);
    }
  })
}

const fetchTrailer = (url, cb) => {
  request
  .get(url)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) {
      cb(err, res);
    } else {
      const imdbData = extractImdbFromViaplayData(res.body);
      fetchFromImdb(imdbData.id, cb);
    }
  });
}

module.exports = fetchTrailer;
