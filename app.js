var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

var indexRouter = require("./routes/index");

app.get("/", indexRouter);
app.get("/play", indexRouter);

var server = http.createServer(app);
var gameServer = new websocket.Server({ server });

var Message = require("./public/javascripts/message.js");

var players = [];
var queue = [];
var games = new Map();
var gamesPlayed = 0;
var minutesPlayed = 0;

gameServer.on("connection", function(player) {

    players.push(player);
    queue.push(player);

    if(queue.length == 2){
        var playerA = queue.pop();
        var playerB = queue.pop();

        var game = new Game(playerA, playerB);

        games.set(playerA, game);
        games.set(playerB, game);

        game.startGame();
    }

    console.log("players.length: " + players.length);
    console.log("games.length: " + games.length);

    player.on("message", function incoming(data) {
        var message = Message.decode(data);
        var game = games.get(player);

        if(player == game.getCodemaker()){
            console.log("The player is a codemaker")
        }
        else if (player == game.getCodebreaker()){
            console.log("The player is a codebreaker")
        }
    });

    

    // let's slow down the server response time a bit to make the change visible on the client side
    //setTimeout(function() {
    //    var message = new Message("pairme", "I am player 1!");
    //    console.log(message.encode());
    //    client.send(message.encode());
    //    //ws.close();
    //}, 2000);
    
    
});

function Game(playerA, playerB){

    // Constructor
    this.playerA = playerA;
    this.playerB = playerB;
    this.codemaker = playerA;
    this.codebreaker = playerB;
    this.round = 0;

    this.getCodemaker = function(){
        return this.codemaker;
    }

    this.getCodebreaker = function(){
        return this.codebreaker;
    }

    this.startGame = function(){
        var message = new Message("start-game", "you are the codemaker");
        this.codemaker.send(message.encode());

        message = new Message("start-game", "you are the codebreaker");
        this.codebreaker.send(message.encode());
    };
}

server.listen(port);