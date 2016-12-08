const express = require('express');
const router = express.Router();

const TrailerService = require('../services/trailer-service');
const trailerService = new TrailerService();

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/trailers', (req, res) => {
  trailerService.fetchTrailer(req.query.url, (err, link) => {
    if(err) {
      res.status(400).json({error: err});
    } else {
      res.json(link);
    }
  })
});

module.exports = router;
