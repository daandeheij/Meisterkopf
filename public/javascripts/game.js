var playerType = null;
var currentGuess = 0;
var currentRound = 0;
const MAXROUNDS = 1;
const MAXGUESSES = 11;

//incoming from server: Client's PlayerType (codemaker/codebreaker)
function setupRound(announcedPlayerType){
    playerType = announcedPlayerType;
    if(playerType == "codemaker"){//TODO: pick a solution}
}
    else {//we are the codebreaker//todo pop-up wait}
}
}

//incoming from server: Codemaker has made a code. Game starts
function startRound(){
    currentRound = 0;
    currentGuess = 0;
}

function endRound(result){
    if(currentRound==MAXROUNDS){
        //end game. Show result
    }
    else{
    currentRound++;
    clearBoard();
}
    //Todo: something with result. show.
}

//incoming from server: the codebreaker's guess
function announceGuess(guess){
    setGuess(currentGuess, guess);
    currentGuess++;
}

//incoming from server: the keys for last guess (correct/or in combination)
//black denotes correct position
//white denotes color in combination but not at correct position
function announceKeys(keys)
{
    var numberOfBlack = keys[0];
    var numberOfWhite = keys[1];
    //first put all the blackpins
    for(j = 0; j < numberOfBlack; j++)
    {
        keypin(currentGuess, j, 'black');        
    }
    for(k = numberOfBlack; k < numberOfBlack+numberOfWhite; k++)
    {
        keypin(currentGuess, k, 'white');
    }
}

//incoming from server: other client has disconnected. 
function playerDisconnected()
{

}

//from this client to server: submit the code (solution)
function submitCode()
{
    socket.send(Message.submitCode(getSolution()));
}

//from this client to server: submit this guess
function submitGuess()
{
    socket.send(Message.submitGuess(getGuess(currentGuess)));
}

var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event){
    var receivedMessage = Message.decode(event.data);
    var receivedType = receivedMessage.type;
    switch(receivedType) {
        case "setupRound":
            setupRound(receivedMessage.data);
            break;
        case "startRound":
            startRound();
            break;
        case "announceGuess":
            announceGuess(receivedMessage.data);
            break;
        case "announceKeys":
            announceKeys(receivedMessage.data);
            break;
        case "playerDisconnected":
            playerDisconnected();
            break;
        case 'endRound':
            endRound(receivedMessage.data);
            break;
    }
}

//socket.onopen = function(){
    //var message = new Message("pairrme", "I am player 1!");
    //console.log("sent: " + message);
    //socket.send(message.encode());
//};