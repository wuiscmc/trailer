var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/trailers', function(req, res) {
  res.json([]);
});

router.get('/trailers/:trailer', function(req, res) {
  res.json({a: 1});
});

module.exports = router;
