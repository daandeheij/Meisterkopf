var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var http = require("http");
var websocket = require("ws");
var port = process.argv[2];

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
app.get('/play', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server = http.createServer(app);
var gameServer = new websocket.Server({ server });

var Message = require("./public/javascripts/message.js");

var queue = [];
var games = new Map();
var gamesPlayed = 0;
var minutesPlayed = 0;

var playerIdCounter = 0;
var gameIdCounter = 0;

const MAXGUESSES = 7;
const MAXROUNDS = 1;

gameServer.on("connection", function(player) {

    // Assign a unique player id to the player.
    player.id = playerIdCounter++;

    console.log("Player " + player.id + " has connected to the server.");

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
        console.log("Setting up round " + this.currentRound + " for game " + this.id);
        this.codemaker.send(Message.setupRound("codemaker"));
        this.codebreaker.send(Message.setupRound("codebreaker"));
    }

    this.startRound = function(){
        console.log("Starting round " + this.currentRound + " for game " + this.id);
        this.playerA.send(Message.startRound());
        this.playerB.send(Message.startRound());
    };

    this.newRound = function(){
        console.log("Creating new round for game " + this.id);

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
        console.log("Codemaker of game " + this.id + " has sumbitted code " + code);
        this.code = code;
        this.startRound();
    }

    this.submitGuess = function(guess){
        console.log("Codebreaker of game " + this.id + " has sumbitted guess " + guess);

        // There are still guesses and rounds left, announce the guess.
        this.announceGuess(guess);

        // Determine the keys.
        var keys = this.getKeys(guess);

        // Announce the keys.
        this.announceKeys(keys);

        // Increment the current guess.
        this.currentGuess++;

        if(keys[0] == this.code.length){
            // The guess matches the code, start a new round.
            this.endRound("success");
        }
        else if(!this.guessesLeft()){
            // The guess was wrong and there are no guesses left, end the round.
            this.endRound("fail");
        }
    }

    this.getKeys = function(guess){
        var black = 0;
        var white = 0;

        var copy = [];
        for(var i = 0; i < guess.length; i++){
            copy.push(guess[i]);
        }

        for (var i = 0; i < this.code.length; i++){
            if (this.code[i] == copy[i]){
                black++;
                copy[i] = null;
            }
        }

        for(var i = 0; i < this.code.length; i++){
            for(var j = 0; j < copy.length; j++){
                if(this.code[i] == copy[j]){
                    white++;
                    copy[j] = null;
                    break;
                }
            }
        }

        return [black, white];
    }

    this.endRound = function(result){
        console.log("Ending round " + this.currentRound + " with result " + result + " for game " + this.id);

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
        console.log("Announcing guess " + guess + " to players " + this.playerA.id + " and " + this.playerB.id + " for game " + this.id);
        // Announce the guess to both players.
        this.playerA.send(Message.announceGuess(guess));
        this.playerB.send(Message.announceGuess(guess));
    }

    this.announceKeys = function(keys){
        console.log("Announcing keys " + keys + " to players " + this.playerA.id + " and " + this.playerB.id + " for game " + this.id);
        // Announce the keys to both players.
        this.playerA.send(Message.announceKeys(keys));
        this.playerB.send(Message.announceKeys(keys));
    }

    this.playerDisconnected = function(player){
        console.log("Player " + player.id + " disconnected from game " + this.id);
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
        console.log("Ending game " + this.id);
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