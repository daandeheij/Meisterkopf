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

var playerIdCounter = 0;
var gameIdCounter = 0;

const maxGuesses = 11;
const maxRounds = 1;

gameServer.on("connection", function(player) {

    // Assign a unique player id to the player.
    player.id = playerIdCounter++;

    // Add the player to the list of players.
    players.push(player);

    // Add the player to the matchmaking queue.
    queue.push(player);


    if(queue.length == 2){
        // The queue has reached a size of 2.

        // Assign each entry of the queue to either player A or player B by popping it twice.
        var playerA = queue.pop();
        var playerB = queue.pop();

        // Create a new game, with player A and player B as the players.
        var game = new Game(playerA, playerB);

        // Assign a unique id to the game.
        game.id = gameIdCounter++;

        // In the games map, assign the key/value pairs with the players as keys and the game as value.
        games.set(playerA, game);
        games.set(playerB, game);

        // Start the game.
        game.startGame();
    }

    // The receive method will be called when a player has sent a message.
    player.on("message", function receive(data) {
        var message = Message.decode(data);
        var game = null;

        // Check if the player is in-game.
        if(games.has(player)){
            // The player is in-game, retrieve the game that the player is in.
            var game = games.get(player);
        }
        else{
            // The player is not in-game, return.
            return;
        }

        // Read the message.
        switch(message.type) {
            case "submitCode":
                game.submitCode();
                break;
            case "submitGuess":
                game.submitGuess();
                break;
        }
    });

    // The disconnected method will be called when a player has closed the connection.
    player.on("close", function disconnected(code) {
        if(games.has(player)){
            // The games map contains a game that has this player in it.
            var game = games.get(player);

            console.log("Player " + player.id + " has disconnected from game " + game.id);

            // Tell the other player that this player has disconnected.
            game.playerDisconnected(player);
        }
        else{
            console.log("Player " + player.id + " has disconnected.");

            // Since the player was not in-game, the player is in the queue.
            // So remove the player from the queue.
            var index = queue.indexOf(player);
            if (index > -1) {
                queue.splice(index, 1);
            }
        }
    });
});

function Game(playerA, playerB){

    // Constructor
    this.playerA = playerA;
    this.playerB = playerB;
    this.codemaker = playerA;
    this.codebreaker = playerB;
    
    this.code = [];
    this.currentRound = 0;
    this.currentGuess = 0;

    this.setupGame = function(){
        this.codemaker.send(Message.setupGame("codemaker"));
        this.codebreaker.send(Message.setupGame("codebreaker"));
    }

    this.startGame = function(){
        this.playerA.send(Message.startGame(currentRound));
        this.playerB.send(Message.startGame(currentRound));
    };

    this.newRound = function(){
        // Swap the roles of both players.
        var temp = this.codemaker;
        this.codemaker = this.codebreaker;
        this.codebreaker = temp;

        // Set the current round and reset the current guess.
        this.currentRound++;
        this.currentGuess = 0;

        // Setup the game again.
        this.setupGame();
    }

    this.submitCode = function(code){
        this.code = code;
    }

    this.submitGuess = function(guess){

        
        this.announceGuess(guess);

        if(this.guessesLeft() == 0){
            
        }
    }

    this.announceGuess = function(guess){
        this.playerA.send(Message.announceGuess(guess));
        this.playerB.send(Message.announceGuess(guess));
    }

    this.announceKeys = function(keys){
        this.playerA.send(Message.announceKeys(keys));
        this.playerB.send(Message.announceKeys(keys));
    }

    this.playerDisconnected = function(player){
        if (player == playerA){
            this.playerA.send(Message.playerDisconnected());
        }
        else if (player == playerB){
            this.playerB.send(Message.playerDisconnected());
        }
    }

    this.endGame = function(){
        this.codemaker.close();
        this.codebreaker.close();
    }

    this.roundsLeft = function(){
        return maxRounds - this.currentRound;
    }

    this.guessesLeft = function(){
        return maxGuesses - this.currentGuess;
    }
}

server.listen(port);