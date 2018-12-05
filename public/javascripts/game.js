var playerType = null;
var currentGuess = null;
const MAXGUESSES = 11;

function incrementCurrentGuess(){
    if(currentGuess == MAXGUESSES){
        roundHasEnded();
    }
    currentGuess++;
    //and maybe do some style shit? :D
}

function roundHasEnded(){
//show results. do some style stuff

}

//incoming from server: Client's PlayerType (codemaker/codebreaker)
function setupStart(announcedPlayerType){
    playerType = announcedPlayerType;
}

//incoming from server: Codemaker has made a code. Game starts
function gameStart(){
    currentRow = 0;
}

//incoming from server: the codebreaker's guess
function announceGuess(guess){

}

//incoming from server: the keys for last guess (correct/or in combination)
//black denotes correct position
//white denotes color in combination but not at correct position
function announceKeys(numberOfWhite, numberOfBlack)
{
    //first put all the blackpins
    for(j = 0; j < numberOfBlack; j++)
    {
        keypin(currentGuess, j, 'black');        
    }
    for(k = numberOfBlack; k < numberOfBlack+numberOfWhite; k++)
    {
        keypin(currentGuess, k, 'white');
    }
    incrementCurrentGuess();
}

//incoming from server: other client has disconnected. 
function playerDisconnected()
{

}

//from this client to server: submit the code (solution)
function submitCode(code)
{
    var message = new Message("submitCode", code);
    socket.send(message.encode());
}

//from this client to server: submit this guess
function submitGuess()
{
    var code = getGuess(currentGuess);
    var message = new Message("submitGuess", code);
    socket.send(message.encode());
}

var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event){
    var receivedMessage = Message.decode(event.data);
    var receivedType = receivedMessage.type;
    switch(receivedType) {
        case "setupStart":
            setupStart(receivedMessage.data);
            break;
        case "gameStart":
            gameStart();
            break;
        case "announceGuess":
            announceGuess(receivedMessage.data);
            break;
        case "announceKeys":
            announceKeys(receivedMessage.data)
            break;
        case "playerDisconnected":
            playerDisconnected();
            break;
    }
}

//socket.onopen = function(){
    //var message = new Message("pairrme", "I am player 1!");
    //console.log("sent: " + message);
    //socket.send(message.encode());
//};