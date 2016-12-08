### Trailer API

This project is based on `Express` server which exposes the needed endpoint to query Viaplay and retrieve afterwards information about a given movie trailer.

#### API

```
GET /trailers?url={viaplayUrl}

{
  site: "Youtube",
  link: "http://youtube.com/watch?v=someId"
}
```

#### Build & Start
```
yarn install
yarn start
```

#### Test
The tests have been splitted into integration and service tests. The following script runs them all:

```
yarn test
```

in case you'd like to run just the `service` or the `integration` ones:

```
yarn test test/integration
yarn test test/services
```

It has been included a Ruby script `load_test_script.rb` to test the behaviour of the API when a high amount of request happens. In order to use it you'd need to install the `typhoeus` gem.

```
gem install typhoeus
```

#### Tech debt

The reason why there is tech debt in this project is the time constrains.

* The API can not handle high amount of requests.
  To solve this, the project would need to start caching the responses for the incoming requests in redis or memcached for instance.

* The services lack testing, even though the development has been progressive and test driven there are some scenarios (error scenarios) that have not been carefully tested.

* The throttling plugin used is not fully compatible with the request library. This happened due to a naive selection of the request library.

* The API is not production ready.

#### Dependencies

* node 6.9.1
* yarn
