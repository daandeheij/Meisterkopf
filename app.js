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

var queue = [];
var games = new Map();
var gamesPlayed = 0;
var minutesPlayed = 0;

var playerIdCounter = 0;
var gameIdCounter = 0;

const MAXGUESSES = 11;
const MAXROUNDS = 1;

gameServer.on("connection", function(player) {

    // Assign a unique player id to the player.
    player.id = playerIdCounter++;

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

        // Setup the first round.
        game.setupRound();
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
                game.submitCode(message.data);
                break;
            case "submitGuess":
                game.submitGuess(message.data);
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
            index = queue.indexOf(player);
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
    
    this.startTime = new Date();

    this.code = [];
    this.currentRound = 0;
    this.currentGuess = 0;

    this.setupRound = function(){
        this.codemaker.send(Message.setupRound("codemaker"));
        this.codebreaker.send(Message.setupRound("codebreaker"));
    }

    this.startRound = function(){
        this.playerA.send(Message.startRound());
        this.playerB.send(Message.startRound());
    };

    this.newRound = function(){

        // Swap the roles of both players.
        var temp = this.codemaker;
        this.codemaker = this.codebreaker;
        this.codebreaker = temp;

        // Set the current round and reset the current guess.
        this.currentRound++;
        this.currentGuess = 0;

        // Setup the next round.
        this.setupRound();
    }

    this.submitCode = function(code){
        this.code = code;
        this.startRound();
    }

    this.submitGuess = function(guess){

        // There are still guesses and rounds left, announce the guess.
        this.announceGuess(guess);

        // TODO: Determine the keys to announce.
        // var keys = .....

        // TODO: Announce the keys.
        // this.announceKeys(keys);

        // Increment the current guess.
        this.currentGuess++;

        if(guess == this.code){
            // The guess matches the code, start a new round.
            this.endRound();
        }
        else if(!this.guessesLeft()){
            // The guess was wrong and there are no guesses left, end the round.
            this.endRound();
        }
    }

    this.endRound = function(){
        // Announce the round end to both players.
        this.playerA.send(Message.endRound(result));
        this.playerB.send(Message.endRound(result));

        if(this.roundsLeft()){
            // There are rounds left, start a new round.
            this.newRound();
        }
        else{
            // There are no rounds left, end the game.
            this.endGame();
        }
    }

    this.announceGuess = function(guess){
        // Announce the guess to both players.
        this.playerA.send(Message.announceGuess(guess));
        this.playerB.send(Message.announceGuess(guess));
    }

    this.announceKeys = function(keys){
        // Announce the keys to both players.
        this.playerA.send(Message.announceKeys(keys));
        this.playerB.send(Message.announceKeys(keys));
    }

    this.playerDisconnected = function(player){
        // Send the player disconnected message to the player that didn't disconnect.
        if (player == playerA){
            this.playerB.send(Message.playerDisconnected());
        }
        else if (player == playerB){
            this.playerA.send(Message.playerDisconnected());
        }

        // End the game.
        this.endGame();
    }

    this.endGame = function(){
        // Remove this game from the games map.
        games.delete(this.playerA);
        games.delete(this.playerB);

        // Close the connections of both players.
        this.playerA.close();
        this.playerB.close();

        // Increment the games played counter.
        gamesPlayed++;

        // Increment the minutes played counter.
        minutesPlayed += (new Date() - this.startTime) / 1000 / 60;
    }

    this.roundsLeft = function(){
        return (MAXROUNDS - this.currentRound) > 0;
    }

    this.guessesLeft = function(){
        return (MAXGUESSES - this.currentGuess) > 0;
    }
}

server.listen(port);