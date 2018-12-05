var express = require('express');
var router = express.Router();

/* GET splash screen. */
router.get('/', function(req, res) {
  res.sendFile("splashscreen.html", {root: "./public"});
});

/* GET game screen. */
router.get('/play', function(req, res) {
  res.sendFile("gamescreen.html", {root: "./public"});
});

module.exports = router;