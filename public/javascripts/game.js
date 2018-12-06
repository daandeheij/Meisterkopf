const MAXROUNDS = 1;
const MAXGUESSES = 11;

var server = new WebSocket("ws://localhost:3000");
var game = new Game();

server.onmessage = function(event){
    var message = Message.decode(event.data);

    switch(message.type) {
        case "setupRound":
            game.setupRound(message.data);
            break;
        case "startRound":
            game.startRound();
            break;
        case "announceGuess":
            game.announceGuess(message.data);
            break;
        case "announceKeys":
            game.announceKeys(message.data);
            break;
        case "playerDisconnected":
            game.playerDisconnected();
            break;
        case 'endRound':
            game.endRound(message.data);
            break;
    };
}

function Game(){

    this.playerType = "";
    this.currentGuess = 0;
    this.currentRound = 0;
    board.setup();

    this.setupRound = function(playerType){
        this.playerType = playerType;

        if (this.playerType == "codemaker"){
            sidebar.setStatus("Please pick a code!");
        }
        else if (this.playerType == "codebreaker"){
            sidebar.setStatus("Please wait for other player to pick code!");
        }
    }

    this.startRound = function(){
        this.currentGuess = 0;

        // Call update clock every second.
        sidebar.startTime = Math.floor(Date.now() / 1000);
        setInterval(sidebar.updateClock, 1000);

        sidebar.setRound(this.currentRound + 1);

        if (this.playerType == "codebreaker"){
            sidebar.setStatus("Player has picked a code. Please submit a guess");
        }
        else if (this.playerType == "codemaker"){
            sidebar.setStatus("Waiting for the other player to make a guess");
        }
    }

    this.endRound = function(result){
        if (this.currentRound == MAXROUNDS){
            sidebar.setStatus("Game has ended! " + result);
        }
        else {
            this.currentRound++;
            sidebar.clearBoard();
            sidebar.setStatus("Round ended!")
        }

        // TODO: show result.
    }

    this.submit = function() {
        if(this.playerType == "codebreaker"){
            this.submitGuess();
        }
        else{
            this.submitCode();
        }
    }

    this.submitGuess = function(){
        var guess = board.getGuess(this.currentGuess);
        server.send(Message.submitGuess(guess));
    }

    this.submitCode = function(){
        var solution = board.getSolution();
        server.send(Message.submitCode(solution));
    }

    this.announceGuess = function(guess){
        board.setGuess(this.currentGuess, guess);
    }

    this.announceKeys = function(keys){
        // Black denotes the number of colors in the correct position.
        // White denotes the number of colors that are correct, but are not in correct position.
        var black = keys[0];
        var white = keys[1];

        // Set all the black keys first.
        for(j = 0; j < black; j++)
        {
            board.setKey(this.currentGuess, j, 'black');
        }

        // Then set all the white keys.
        for(k = black; k < black + white; k++)
        {
            board.setKey(this.currentGuess, k, 'white');
        }

        // Increment the current guess.
        this.currentGuess++;

        if (this.playerType == "codebreaker"){
            sidebar.setStatus("Keep trying ;)");
        }
        else if (this.playerType == "codemaker")
        {
            sidebar.setStatus("Other player has made guess: " + this.currentGuess + " /8");
        }
    }

    this.playerDisconnected = function(){
        sidebar.setStatus("The other player has left the game :(");
    }
}