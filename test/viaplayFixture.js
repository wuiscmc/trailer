module.exports = [
  {
    pattern: 'https://content.viaplay.se/pc-se/film/(.*)',

    fixtures: function (match, params, headers) {
      return {
        "_embedded": {
          "viaplay:blocks": [
            {
              "_embedded": {
                "viaplay:product": {
                  "content": {
                    "imdb": {
                      "id": "tt2637276",
                      "rating": "6.3",
                      "url": "http://www.imdb.com/title/tt2637276?ref_ext_viaplay",
                      "votes": "124 871"
                    },
                  }
                }
              }
            }
          ]
        }
      }
    },
    get: function (match, data) {
      return {
        body: data
      };
    },
  }
];
