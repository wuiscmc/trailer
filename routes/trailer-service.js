const TheMovieDBAPI = require('./the-movie-api');
const ViaplayAPI = require('./viaplay-api');

class TrailerService {
  constructor() {
    this.trailerAPI = new TheMovieDBAPI(process.env.THE_MOVIE_DB_API_KEY);
    this.viaplayAPI = new ViaplayAPI(process.env.VIAPLAY_ENDPOINT);
  }

  fetchTrailer(movie, cb) {
    this.viaplayAPI.fetch(movie, (err, res) => {
      const movieId = this.extractMovieId(res);

      this.trailerAPI.fetchVideo(movieId, (err, res) => {
        cb(null, this.buildTrailerLink(res));
      });
    });
  }

  extractMovieId(movieData) {
    return movieData._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id;
  }

  buildTrailerLink(trailerData) {
    const result = trailerData.results[0];

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
}

module.exports = TrailerService;
