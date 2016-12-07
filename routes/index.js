const express = require('express');
const router = express.Router();
const TrailerService = require('./trailer-service');

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/trailers/:movie', (req, res) => {
  const trailerService = new TrailerService();

  trailerService.fetchTrailer(req.params.movie, (err, link) => {
    if(err) {
      res.status(400).json({error: err});
    } else {
      res.json(link);
    }
  })
});

module.exports = router;
