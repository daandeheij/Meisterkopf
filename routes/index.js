var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    res.sendFile("splashscreen.html", {root: "./public"});
});

/* Pressing the 'PLAY' button, returns this page */
router.get("/play", function(req, res) {
    res.sendFile("gamescreen.html", {root: "./public"});
});

module.exports = router;