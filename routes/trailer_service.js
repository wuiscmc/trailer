const request = require('superagent');
const Throttle = require('superagent-throttle');

const API_KEY = '7026f4d3d210532109f1c5a6602fbf0b';

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

const fetchFromImdb = (imdbId, fn) => {
  let throttle = new Throttle({
    active: true,
    rate: 40,
    ratePer: 10000,
    concurrent: 20,
  });

  request
  .get(`https://api.themoviedb.org/3/movie/${imdbId}/videos`)
  .query({api_key: API_KEY, language: 'en-US', external_source: 'imdb_id'})
  .use(throttle.plugin())
  .end((err, res) => {
    if(err) {
      fn(err, res);
    } else {
      const data = extractLinkFromImdbData(res.body)
      fn(err, data);
    }
  })
}

const fetchTrailer = (url, fn) => {
  request
  .get(url)
  .end((err, res) => {
    if (err) {
      fn(err, res);
    } else {
      const imdbData = extractImdbFromViaplayData(res.body);
      fetchFromImdb(imdbData.id, fn);
    }
  });
}

module.exports = fetchTrailer;
