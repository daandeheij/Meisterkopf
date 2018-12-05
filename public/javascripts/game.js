var playerType = null;

//incoming from server: Client's PlayerType (codemaker/codebreaker)
function setupStart(announcedPlayerType){
    playerType = announcedPlayerType;
}

//incoming from server: Codemaker has made a code. Game starts
function gameStart(){

}

//incoming from server: the codebreaker's guess
function announceGuess(guess){

}

//incoming from server: the keys for last guess (correct/or in combination)
function announceKeys(keys)
{

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
function submitGuess(code)
{
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
        case "gameStart":
            gameStart();
        case "announceGuess":
            announceGuess(receivedMessage.data);
        case "announceKeys":
            announceKeys(receivedMessage.data)
        case "playerDisconnected":
            playerDisconnected();
    }
}

//socket.onopen = function(){
    //var message = new Message("pairrme", "I am player 1!");
    //console.log("sent: " + message);
    //socket.send(message.encode());
//};