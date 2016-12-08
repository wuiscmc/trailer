require 'typhoeus'

url = "http://localhost:3000/trailers?url=https://content.viaplay.se/pc-se/film/ted-2-2015"

hydra = Typhoeus::Hydra.new
20.times do |i|
  request = Typhoeus::Request.new(url)
  request.on_complete do |response|
    puts i, response.code, response.body
  end
  hydra.queue(request)
end
hydra.run
