var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

var indexRouter = require("./routes/index");

app.get("/", indexRouter);
app.get("/play", indexRouter);




const Message = require("./public/javascripts/message.js");
var server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.on("connection", function(ws) {
    
    //let's slow down the server response time a bit to make the change visible on the client side
    setTimeout(function() {
        let message = new Message("pairme", "I am player 1!");
        console.log(message.encode());
        ws.send(message.encode());
        ws.close();
    }, 2000);
    
    ws.on("message", function incoming(message) {
        let receivedMessage = Message.decode(message);
        console.log(receivedMessage.encode());
    });
});

server.listen(port);