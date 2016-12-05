module.exports = [
  {
    pattern: 'https://api.themoviedb.org/3/movie/(.*)',

    fixtures: function (match, params, headers) {
      return {
        "id": 214756,
        "results": [
          {
            "id": "54cab2eb92514157cc00df74",
            "iso_639_1": "en",
            "iso_3166_1": "US",
            "key": "S3AVcCggRnU",
            "name": "Ted 2 - Official Trailer (HD)",
            "site": "YouTube",
            "size": 1080,
            "type": "Trailer"
          }
        ]
      }
    },
    get: function (match, data) {
      return {
        body: data
      };
    },
  }
];
