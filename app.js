var express = require("express");
var http = require("http");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

var indexRouter = require("./routes/index");
app.get("/", indexRouter);
app.get("/play", indexRouter);