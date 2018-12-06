const MAXROUNDS = 1;
const MAXGUESSES = 7;

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

    this.score = 0;
    this.opponentScore = 0;

    board.setup();
    board.show();
    sidebar.show();

    this.setupRound = function(playerType){
        this.playerType = playerType;
        sidebar.setRound(this.currentRound + 1);
        if (this.playerType == "codemaker"){
            sidebar.setStatus("Please pick a code!");
            board.showSolution();
            board.showColorPicker();
            board.showButton();
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

        if (this.playerType == "codebreaker"){
            sidebar.setStatus("Player has picked a code. Please submit a guess");
            board.showColorPicker();
            board.showButton();
            board.showRow(this.currentGuess);
        }
        else if (this.playerType == "codemaker"){
            sidebar.setStatus("Waiting for the other player to make a guess");
            board.hideColorPicker();
            board.hideButton();
        }
    }

    this.endRound = function(result){
        var wonRound = false;

        if (this.playerType == "codemaker" && result == "fail"){
            this.score++;
            wonRound = true;
        }
        else if (this.playerType == "codemaker" && result == "success"){
            this.opponentScore++;
        }
        else if (this.playerType == "codebreaker" && result == "fail"){
            this.opponentScore++;
        }
        else if (this.playerType == "codebreaker" && result == "success"){
            this.score++;
            wonRound = true;
        }

        if(this.currentRound == MAXROUNDS && score > opponentScore){
            sidebar.setStatus("You have won the game!");
        }
        else if(this.currentRound == MAXROUNDS && score == opponentScore){
            sidebar.setStatus("The game ended in a tie!");
        }
        else if(this.currentRound == MAXROUNDS && score < opponentScore){
            sidebar.setStatus("Your opponent has won the game!");
        }
        else if(this.currentRound < MAXROUNDS){
            this.currentRound++;
            board.reset();

            if(wonRound){
                sidebar.setStatus("You has won this rpund!");
            }
            else{
                sidebar.setStatus("Your opponent has won this round!");
            }
        }
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
            board.showRow(this.currentGuess);
        }
        else if (this.playerType == "codemaker")
        {
            sidebar.setStatus("Other player has made guess: " + this.currentGuess + " / " + (MAXGUESSES + 1));
            board.showRow(this.currentGuess-1);
        }
    }

    this.playerDisconnected = function(){
        sidebar.setStatus("The other player has left the game :(");
        board.disable();
        hideColorPicker();
        hideButton();
    }
}