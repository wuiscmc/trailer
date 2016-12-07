const express = require('express');
const router = express.Router();
const trailerService = require('./trailer-service');

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/trailers', (req, res) => {
  trailerService(req.query.q, (err, payload) => {
    if(err) {
      res.status(400).json({error: err});
    } else {
      res.json(payload);
    }
  })
});

module.exports = router;
